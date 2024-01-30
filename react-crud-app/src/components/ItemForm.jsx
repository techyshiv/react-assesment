import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const ItemForm = () => {
    const { register, handleSubmit, setValue } = useForm();
    const history = useHistory();
    const { id } = useParams();
    const isEditing = !!id;

    const onSubmit = async (data) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3001/api/items/${id}`, data);
            } else {
                await axios.post('http://localhost:3001/api/items', data);
            }
            history.push('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        if (isEditing) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/items/${id}`);
                    const { name } = response.data;
                    setValue('name', name);
                } catch (error) {
                    console.error('Error fetching item data:', error);
                }
            };
            fetchData();
        }
    }, [isEditing, id, setValue]);

    return (
        <div>
            <h2>{isEditing ? 'Edit Item' : 'Add Item'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name:
                    <input {...register('name', { required: true })} />
                </label>
                <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default ItemForm;
