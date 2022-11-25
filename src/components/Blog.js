import React, {useState} from "react";
import axios from "axios";
import Article from "./Article.js";
import useFirstRender from "./FirstRender.js";

function Blog() {

	const [articles, setArticles] = useState();
	const [author, setAuthor] = useState();
	const [message, setMessage] = useState();
	var allArticles = "";

	function updateArticles() {
		axios.get("http://localhost:3003/articles").then(response => {
			setArticles(response.data);
		});
	}

	function msgSend() {
		var blogError = document.getElementById("BlogError");
		var error;

		if ((author === undefined) || (author.trim() === '')) {
			error = "Veillez fournir un nom";
		}
		else if ((message === undefined) || (message.trim() === '')) {
			error = "Veillez fournir un message";
		}
		else if (message.trim().length < 140) {
			error = "Veillez écrire un minimum de 140 caractères";
		}
		else {
			blogError.style.display = "none";
		}

		if (error !== undefined) {
			blogError.innerHTML = error;
			blogError.style.display = "initial";
			return;
		}

		axios({
			method: "POST",
			url: "http://localhost:3003/articles",
			data: {
				author: author.trim(),
				content: message.trim(),
				date: Date.now()
			}
		});

		updateArticles();

		document.getElementById("blogFormName").value = "";
		document.getElementById("blogFormMsg").value = "";
	}

	if (useFirstRender()) {
		updateArticles();
	}

	if (articles !== undefined) {
		allArticles = articles.sort((a, b) => b.date - a.date).map((article) => Article(article));
	}

	return (
	  <div id="Blog">
		<div className="Form">
			<h2>Blog</h2>
			<input id="blogFormName" placeholder="Nom" onChange={elem => setAuthor(elem.target.value)}></input>
			<textarea id="blogFormMsg" placeholder="Message" onChange={elem => setMessage(elem.target.value)}></textarea>
			<p id="BlogError"></p>
			<div className="Form-Buttons">
				<button onClick={msgSend}>Envoyer</button>
			</div>
		</div>
		<div id="Results">{allArticles}</div>
	  </div>
	);
};

export default Blog;