import { createSlice, configureStore } from '@reduxjs/toolkit';
import {booksArr} from '../components/books.js';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

const credentials = {
    user1: {
        username: 'Gaurav',
        password: 'Gaurav',
        wallet: '$5000',
    },
    user2: {
        username: 'Mohit',
        password: 'Mohit',
        wallet: '$2000',
    },
    user3: {
        username: 'Saurabh',
        password: 'Saurabh',
        wallet: '$5500',
    },
    passed: false,
    loggedInUser: {
        username: '',
        password: '',
        wallet: '',
        booksRented: []
    },
    books: {
        book0: {
            copies: 0
        },
        book1: {
            copies: 0
        },
        book2: {
            copies: 0
        },
        book3: {
            copies: 0
        },
        book4: {
            copies: 0
        },
        book5: {
            copies: 0
        },
        book6: {
            copies: 0
        },
        book7: {
            copies: 0
        }
    }
};


const loginSlice = createSlice({
    name: 'login',
    initialState: credentials,
    reducers: {
        initializeWithDefaults(state, action){
            console.log(action.payload.username, 'inside reducer - initialzeWithDefaults');
            if(action.payload.username === state.user1.username) {
                console.log('Gaurav initialzed')
                state.loggedInUser.wallet = '$5000';
            }
            else if(action.payload.username === state.user2.username ) {
                console.log('Mohit initialzed');
                state.loggedInUser.wallet = '$2000';
            }
            else if(action.payload.username === state.user3.username) {
                console.log('Saurabh initialzed');
                state.loggedInUser.wallet = '$5500'; 
            }
        },
        checkCredentials(state, action) {
            if( (action.payload.username === state.user1.username && action.payload.password === state.user1.password ) 
                || (action.payload.username === state.user2.username && action.payload.password === state.user2.password )
                || (action.payload.username === state.user3.username && action.payload.password === state.user3.password ) ) {
                    state.passed = true;
                    state.loggedInUser.username = action.payload.username;
                    switch(action.payload.username.toString()) {
                        case state.user1.username.toString(): {
                            state.loggedInUser.wallet = state.user1.wallet;
                            break;
                        }
                        case state.user2.username.toString(): {
                            state.loggedInUser.wallet = state.user2.wallet;
                            break;
                        }
                        case state.user3.username.toString(): {
                            state.loggedInUser.wallet = state.user3.wallet;
                            break;
                        }
                        default: {
                            break;
                        }
                    }

                    let arr = Object.keys(state.books);
                    booksArr.map((book, i) => {
                            state.books[`${arr[i]}`].copies = book.copies;
                    });
            }
            else {
                state.passed = false;
            }
        },
        resetPassed(state) {
            state.passed = false;
        },
        rentBook(state, action) {
            state.loggedInUser.wallet = action.payload.leftNow;
            state.loggedInUser.booksRented.push({title: action.payload.title, author: action.payload.author, pic: action.payload.pic, rentdate: action.payload.date});
            let arr = Object.keys(state.books);
            arr.map((obj) => {
                if(parseInt(obj.slice(-1)) === action.payload.id) {
                    state.books[`${obj}`].copies -= 1;
                }
            })
        },
        fillLoggedInUserData(state, action) {
            state.loggedInUser.wallet = action.payload.wallet;
            state.loggedInUser.username = action.payload.username;
            state.loggedInUser.booksRented = [...action.payload.booksRented];
            if(action.payload.username === state.user1.username) {
                state.user1.wallet = action.payload.wallet;
            }
            else if(action.payload.username === state.user2.username) {
                state.user2.wallet = action.payload.wallet;
            }
            else if(action.payload.username === state.user3.username) {
                state.user3.wallet = action.payload.wallet;
            }
        },
        resetState(state, action) {
            console.log(' i m called ');
            storage.removeItem('persist:root');
            state = credentials;
        }
    }
});

const bookState = {
    id: 0,
    title: '',
    author: '',
    pic: '',
    copies: 0,
    'rent cost': '',
    pages: 0,
    ISBN: 0
}

const bookSlice = createSlice({
    name: 'book',
    initialState: bookState,
    reducers: {
        selectBook(state, action) {
            state.title = action.payload.title;
            state.author = action.payload.author;
        },
        selectedBook(state, action) {
            state.id = action.payload.selectedBookContents.id;
            state.title = action.payload.selectedBookContents.title;
            state.author = action.payload.selectedBookContents.author;
            state.pic = action.payload.selectedBookContents.pic;
            state.copies = action.payload.selectedBookContents.copies;
            state['rent cost'] = action.payload.selectedBookContents['rent cost'];
            state.pages = action.payload.selectedBookContents.pages;
            state.ISBN = action.payload.selectedBookContents.ISBN;
        },
        reset(state) {
            state = undefined;
        }
    }
});


const pageState = {
    page: 'login'
}

const pageSlice = createSlice({
    name: 'page',
    initialState: pageState,
    reducers: {
        currentPage(state, action) {
            state.page = action.payload.page;
        }
    }
})

const reducers = combineReducers({
    login: loginSlice.reducer,
    book: bookSlice.reducer,
    page: pageSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const loginActions = loginSlice.actions;
export const bookActions = bookSlice.actions;
export const pageActions = pageSlice.actions;

export default store;
