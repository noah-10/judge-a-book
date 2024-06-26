import { useQuery, useMutation } from "@apollo/client"
import { SAVED_BOOKS } from "../../utils/queries"
import { ADD_CURRENTLY_READING, REMOVE_SAVED_BOOK } from "../../utils/mutations";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Book from "./Book";
import BookModal from "./BookModal";

import '../css/savedBooks.css'

const SavedBooks = () => {

    const [addToCurrentlyReading] = useMutation(ADD_CURRENTLY_READING);
    const [removeBook] = useMutation(REMOVE_SAVED_BOOK);

    // Query for saved books
    const { loading, data, refetch } = useQuery(SAVED_BOOKS);

    // State for if the modal is being shown
    const [showModal, setShowModal] = useState(false);

    // State for what book is clicked
    const [clickedBook, setClickedBook] = useState(null);

    const [userBooks, setUserBooks] = useState([]);

    // Refetches the query to stay updated
    useEffect(() => {
        refetch()
    }, []);


    useEffect(() => {
        if (!loading && data && data.savedBooks.savedBooks) {
            setUserBooks(data.savedBooks.savedBooks);
        }
    }, [loading, data]);

    // Function to set state of books thats clicked and to show modal
    const handleOpenModal = (book) => {
        setClickedBook(book);
        setShowModal(true);
    }

    // Function to empty the state of book clicked and not show modal
    const handleCloseModal = () => {
        setClickedBook(null);
        setShowModal(false);
    }

    const startedReading = async (book) => {
        const { __typename, ...input } = book;
        const bookId = input.bookId;
        try{
            // Adds book to finished books subdocument
            const { data } = await addToCurrentlyReading({
                variables: { input }
            });

            // Removes book from currently Reading subdocument
            await removeBook({
                variables: { bookId }
            });

            refetch();

            handleCloseModal();

            return data;
        }catch(err){
            return { error: err }
        }
    }

    return (
        <>
            <h2>Saved Books:</h2>
            <div className="books-collection">
                {userBooks.length > 0 ? (
                    userBooks.map((book) => (
                            <div className="book-items" key={book.bookId}>
                                <Book 
                                cover={book.cover}
                                title={book.title}
                                author={book.authors}
                                onClick={() => handleOpenModal(book)}
                                />
                            </div>
                        
                    ))
                ) : (
                    <div className="no-books">
                        <p>You don't have any books saved!</p>
                        <p>Go to the <Link to='/feed'>feed</Link>  to find a new book!</p>
                    </div>
                    
                )}
                
            </div>
            {showModal && <BookModal 
                closeModal={handleCloseModal}
                book={clickedBook}
                page= "Saved Book"
                bookState = {startedReading}
            />}
        </>
    )

}

export default SavedBooks;