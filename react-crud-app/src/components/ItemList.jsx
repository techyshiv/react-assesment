import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5; // Set the number of items per page

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]); // Fetch data when the current page changes

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:3001/api/items/${id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const getPageItems = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return items.slice(startIndex, endIndex);
    };

    const getTotalPages = () => Math.ceil(items.length / ITEMS_PER_PAGE);

    return (
        <div>
            <h2>Item List</h2>
            <Link to="/add">Add Item</Link>
            <ul>
                {getPageItems().map((item) => (
                    <li key={item.id}>
                        {item.name}{' '}
                        <span>
                            <Link to={`/edit/${item.id}`}>Edit</Link>{' '}
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </span>
                    </li>
                ))}
            </ul>

            <div>
                <span>Page {currentPage} of {getTotalPages()}</span>
                <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>Previous</button>
                <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()))}>Next</button>
            </div>
        </div>
    );
};

export default ItemList;
