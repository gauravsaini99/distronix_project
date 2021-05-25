import { StarTwoTone } from '@material-ui/icons';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const loginState = { passedUsername: false, passedPassword: false, errorUsernameMessage: '', errorPasswordMessage: ''};

const credentials = {
        username1: 'Gaurav',
        password1: 'Gaurav',
        username2: 'Mohit',
        password2: 'Mohit',
        username3: 'Saurabh',
        password3: 'Saurabh',
        passed: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState: credentials,
    reducers: {
        checkCredentials(state, action) {
            if( (action.payload.username === state.username1 && action.payload.password === state.password1 ) 
                || (action.payload.username === state.username2 && action.payload.password === state.password2 )
                || (action.payload.username === state.username3 && action.payload.password === state.password3 ) ) {
                    state.passed = true;
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

const store = configureStore({
    reducer: { login: loginSlice.reducer }
});

export const loginActions = loginSlice.actions;

export default store;
