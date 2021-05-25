import { StarTwoTone } from '@material-ui/icons';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const loginState = { passedUsername: false, passedPassword: false, errorUsernameMessage: '', errorPasswordMessage: ''};

const credentials = {
        username1: 'Gaurav',
        password1: 'GauravsPassword',
        username2: 'Mohit',
        password2: 'MohitsPassword',
        username3: 'Saurabh',
        password3: 'SaurabhsPassword',
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

            // if(state.username === action.payload.username) {
            //     state.passedUsername = true;
            //     state.errorMessage = '';
            // }
            // else if(state.username !== action.payload.username) {
            //     state.passed = false;
            //     state.errorUsernameMessage = 'username incorrect!';
            // }
        // },
        // checkPassword(state, action) {
        //     console.log(action.payload, 'action.payload');
        //     if(state.password === action.payload.password) {
        //         state.passedPassword = true;
        //         state.errorMessage = '';
        //     }
        //     else if(state.password !== action.payload.password) {
        //         state.passedPassword = false;
        //         state.errorPasswordMessage = 'password incorrect!';
        //     }
        // }
        }
    }
});

const store = configureStore({
    reducer: { login: loginSlice.reducer }
});

export const loginActions = loginSlice.actions;

export default store;
