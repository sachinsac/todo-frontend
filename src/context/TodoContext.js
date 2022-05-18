import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { account, bai } from '../utils/constants';

export const TodoContext = React.createContext();

// get ethereum object from window, when metamask is installed
const { ethereum } = window;

const ethereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const todoListContract = new ethers.Contract(account, bai, signer);
	return todoListContract;
}

export const TodoProvider = ({ children }) => {

	const [ currentAccount, setCurrentAccount ] = useState();
	const [ todoData, setTodoData ] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try{
			if(!ethereum) return alert("Please install metamask");

			const accounts = await ethereum.request({method: "eth_accounts"});

			if (accounts.length) {
				setCurrentAccount(accounts[0]);

				// get all todo list
			}else{
				console.log("No Accounts found");
			}
		}catch(error) {
			console.log(error);

			throw new Error("No ethereum object");
		}
	}


	const connectWallet = async () => {
		try{

			if(!ethereum) return alert("Please install metamask");

			const accounts = await ethereum.request({method: "eth_requestAccounts"});

			setCurrentAccount(accounts[0]);

		}catch(error) {
			console.log(error);

			throw new Error("No ethereum object");
		}
	}

	const updateTodoStatus = async (e) => {
		console.log(e)
	}

	const getTodoItems = async () => {
		try{
			const contract = ethereumContract();
			const totalItems = await contract.totalItems();
			const count = Number(totalItems._hex);
			let data = []
			for(let i=1;i<=count;i++) {
				let each_item = await contract.todoMapping(i);
				data.push(each_item);
			}

			setTodoData(data);

		}catch (error) {
			console.log("error");
		}
	}

	const createTodo = async (title) => {
		try{
			const contract = ethereumContract();
			await contract.createTodo(title);
		}catch (error) {
			console.log("error");
		}
	}

	useEffect(()=>{
		checkIfWalletIsConnected();
		getTodoItems();
	}, []);

	return (
		<TodoContext.Provider value={{ connectWallet, updateTodoStatus, currentAccount, todoData,
		 createTodo}}>
			{children}
		</TodoContext.Provider>
	)
}