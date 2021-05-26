import { createSlice, configureStore } from '@reduxjs/toolkit';
import {booksArr} from '../components/books.js';

const credentials = {
    user1: {
        username: 'Gaurav',
        password: 'Gaurav',
        wallet: '$200',
    },
    user2: {
        username: 'Mohit',
        password: 'Mohit',
        wallet: '$100',
    },
    user3: {
        username: 'Saurabh',
        password: 'Saurabh',
        wallet: '$50',
    },
    passed: false,
    loggedInUser: {
        username: '',
        password: '',
        wallet: ''
    }
};


const loginSlice = createSlice({
    name: 'login',
    initialState: credentials,
    reducers: {
        checkCredentials(state, action) {
            if( (action.payload.username === state.user1.username && action.payload.password === state.user1.password ) 
                || (action.payload.username === state.user2.username && action.payload.password === state.user2.password )
                || (action.payload.username === state.user3.username && action.payload.password === state.user3.password ) ) {
                    state.passed = true;
                    state.loggedInUser.username = action.payload.username;
                    switch(action.payload.username.toString()) {
                        case state.user1.username.toString(): {
                            console.log('i came here')
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
            }
            else {
                state.passed = false;
            }
        },
        resetPassed(state) {
            console.log('reached here...')
            state.passed = false;
        }
    }
});

const bookState = {
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
            state.title = action.payload.selectedBookContents.title;
            state.author = action.payload.selectedBookContents.author;
            state.pic = action.payload.selectedBookContents.pic;
            state.copies = action.payload.selectedBookContents.copies;
            state['rent cost'] = action.payload.selectedBookContents['rent cost'];
            state.pages = action.payload.selectedBookContents.pages;
            state.ISBN = action.payload.selectedBookContents.ISBN;
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

const store = configureStore({
    reducer: { 
        login: loginSlice.reducer,
        book: bookSlice.reducer,
        page: pageSlice.reducer,
    }
});

export const loginActions = loginSlice.actions;
export const bookActions = bookSlice.actions;
export const pageActions = pageSlice.actions;

export default store;
