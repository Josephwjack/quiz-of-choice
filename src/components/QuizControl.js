import React, { useState, useEffect } from 'react';
import NewQuizForm from './NewQuizForm';
import QuizList from './QuizList';
import QuizDetail from './QuizDetail';
import EditQuizForm from './EditQuizForm';
import db from './../firebase.js';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

function QuizControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainQuizList, setMainQuizList] = useState([]);
  const [mainResponseList, setMainResponse] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "quizzes"),
      (collectionSnapshot) => {
        const quizzes = [];
        collectionSnapshot.forEach((doc) => {
          quizzes.push({
            ... doc.data(),
            id: doc.id
          });
        });
        setMainQuizList(quizzes);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedQuiz != null) {
      setFormVisibleOnPage(false);
      setSelectedQuiz(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingQuiz = async (id) => {
    await deleteDoc(doc(db, "quizzes", id));
    setSelectedQuiz(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingQuizInList = async (quizToEdit) => {
    const quizRef = doc(db, "quizzes", quizToEdit.id);
    await updateDoc(quizRef, quizToEdit);
      setEditing(false);
      setSelectedQuiz(null);
  }

  const handleChangingSelectedQuiz = (id) => {
    const selection = mainQuizList.filter(quiz => quiz.id === id)[0];
    setSelectedQuiz(selection);
  }

  const handleAddingNewQuizToList = async (newQuizData) => {
   const collectionRef = collection(db, "quizzes");
   await addDoc(collectionRef, newQuizData); 
   setFormVisibleOnPage(false);
  }

  const handleAddingNewResponseToList = async (newResponseData) => {
    const collectionRef = collection(db, "responses");
    await addDoc(collectionRef, newResponseData);
    setSelectedQuiz(null);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (editing) {
    currentlyVisibleState =
      <EditQuizForm 
        quiz = {selectedQuiz}
        onEditQuiz = {handleEditingQuizInList} />
      buttonText = "Return to Quiz List";
  } else if (selectedQuiz != null) {
    currentlyVisibleState = 
      <QuizDetail
        quiz = {selectedQuiz}
        onClickingDelete = {handleDeletingQuiz}
        onClickingEdit = {handleEditClick}
        onSubmittingQuiz = {handleAddingNewResponseToList} />
      buttonText = "Return to Quiz List";
  } else if(formVisibleOnPage) {
    currentlyVisibleState = 
      <NewQuizForm
        onNewQuizCreation = {handleAddingNewQuizToList} />
        buttonText = "Return to Quiz List";
  } else {
    currentlyVisibleState =
      <QuizList
        quizList = {mainQuizList}
        onQuizSelection = {handleChangingSelectedQuiz} />
      buttonText = "Add Quiz";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      {error ? null : <button onClick = {handleClick}>{buttonText}</button>}
    </React.Fragment>
  );

}

export default QuizControl;