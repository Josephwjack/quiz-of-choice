import React, { useState, useEffect } from 'react';
import NewQuizForm from './NewQuizForm';
import QuizList from './QuizList';
import QuizDetail from './QuizDetail';
import EditQuizForm from './EditQuizForm';
import ResponseList from './ResponseList';
import { db, auth } from './../firebase.js';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import QuizDashboard from './QuizDashboard';
import Button from 'react-bootstrap/Button';
import { Route } from "react-router-dom";

function QuizControl(match) {
  
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainQuizList, setMainQuizList] = useState([]);
  const [mainResponseList, setMainResponseList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [responsesVisibleOnPage, setResponsesVisibleOnPage] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [viewDashboard, setViewDashboard] = useState(false);

  <Route path={match.url + "/dashboard"} element={<QuizDashboard />}/>

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "quizzes"),
      (collectionSnapshot) => {
        const quizzes = [];
        collectionSnapshot.forEach((doc) => {
          quizzes.push({
            ...doc.data(),
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

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "responses"),
      (collectionSnapshot) => {
        const responses = [];
        collectionSnapshot.forEach((doc) => {
          responses.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setMainResponseList(responses);
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
      setResponsesVisibleOnPage(false);
    } else if (responsesVisibleOnPage) {
      setResponsesVisibleOnPage(false);  
    } else {  
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }
  

  const handleMyDashboard = () => {
    setViewDashboard(!viewDashboard)
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

  const handleViewResponses = (id) => {
    const selection = mainResponseList.filter(response => response.quizId === id);
    setSelectedResponses(selection);
    setResponsesVisibleOnPage(true);
    console.log(selectedQuiz);
  }

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1 style={{textAlign:'center'}}>You must be signed in to access quizzes.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
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
    } else if (responsesVisibleOnPage) {
      currentlyVisibleState = 
        <ResponseList
          quiz = {selectedQuiz}
          responses = {selectedResponses} />
        buttonText="Return to Quiz List";
    } else if (selectedQuiz != null) {
      currentlyVisibleState = 
        <QuizDetail
          quiz = {selectedQuiz}
          onClickingDelete = {handleDeletingQuiz}
          onClickingEdit = {handleEditClick}
          onSubmittingQuiz = {handleAddingNewResponseToList} />
        buttonText = "Return to Quiz List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = 
        <NewQuizForm
          onNewQuizCreation = {handleAddingNewQuizToList} />
        buttonText = "Return to Quiz List";
    } else if (viewDashboard) {
      currentlyVisibleState = 
        <QuizDashboard 
          quizList={mainQuizList}
          onQuizSelection={handleChangingSelectedQuiz}
          changeList={handleMyDashboard}
          onViewResponses = {handleViewResponses} />
        buttonText = "Create Quiz";
    } else {
      currentlyVisibleState =
        <QuizList
          quizList = {mainQuizList}
          onQuizSelection = {handleChangingSelectedQuiz}
          changeList={handleMyDashboard}
          onViewResponses = {handleViewResponses} />
        buttonText = "Add Quiz";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        {/* {auth.currentUser != null ? <button onClick={() => setViewDashboard(true)}>View My Quizzes</button> : null} */}
        {/* ^^^ button to re-activate dashboard if header doesn't work. */}
        {error ? null : <Button onClick = {handleClick}>{buttonText}</Button>}
      </React.Fragment>
    );
  }

}

export default QuizControl;