import React from 'react';
import axios from "axios";
import Moment from 'moment';
import 'moment/locale/fr'

function Article(props) {

	function msgDelete(elem) {
		if (window.confirm("Êtes-vous sur de vouloir supprimer ce message ?") === false) {
			return;
		}
		elem.parentElement.parentElement.remove();
		axios.delete("http://localhost:3003/articles/" + props.id);
	}

	function msgCancelInit(articleButton) {
		articleButton.setAttribute('data-action', 'modify');
		articleButton.innerHTML = "Modifier";
		document.getElementById("article-cancel-" + props.id).style.display = "none";
	}

	function msgCancel() {
		var article = document.getElementById('article-' + props.id);
		var articleButton = document.getElementById('article-modify-' + props.id);

		msgCancelInit(articleButton);
		article.outerHTML = "<p id=\"article-" + props.id + "\">" + props.content + "</p>";
	}

	function msgModify() {
		var article = document.getElementById('article-' + props.id);
		var articleButton = document.getElementById('article-modify-' + props.id);
		var articleCancel = document.getElementById('article-cancel-' + props.id);

		if (articleButton.getAttribute('data-action') === 'modify') {
			article.outerHTML = "<textarea id=\"article-" + props.id + "\">" + props.content + "</textarea>";
			articleButton.setAttribute('data-action', 'apply');
			articleButton.innerHTML = "Appliquer";
			articleCancel.style.display = 'initial';
		}
		else { // data-action === 'apply'
			var newContent = article.value;

			if (newContent === "") {
				alert('Impossible d\'appliquer le changement car le message est vide !');
				return;
			}
			else if (newContent.length < 140) {
				alert('Veillez écrire un minimum de 140 caractères');
				return;
			}

			if (window.confirm("Êtes-vous sur de vouloir remplacer ce message ?") === false) {
				return;
			}

			article.outerHTML = "<p id=\"article-" + props.id + "\">" + newContent + "</p>";
			props.content = newContent;
			msgCancelInit(articleButton);

			axios.patch("http://localhost:3003/articles/" + props.id, {
				author: props.author,
				content: newContent,
				date: props.date,
				id: props.id
			});
		}
	}

	var date = Moment(props.date);

	return (
      <div className='Article' key={props.id}>
        <span className='Left Author'>{props.author}</span>
		<span className='Right Italic'>{'Posté le ' + date.format("D MMMM YYYY") + " à " + date.format("HH:mm:ss")}</span>
		<br></br>
        <p id={'article-' + props.id}>{props.content}</p>
		<div className='Buttons'>
			<button className='Cancel' id={"article-cancel-" + props.id} onClick={msgCancel}>Cancel</button>
			<button data-action='modify' id={'article-modify-' + props.id} onClick={msgModify}>Modifier</button>
			<button onClick={(elem) => {msgDelete(elem.target)}}>Supprimer</button>
		</div>
      </div>
	);
};

export default Article;