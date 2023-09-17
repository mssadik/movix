import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'


const initialState = {
  name: '',
  email: '',
  isLoading: true,
  error: '',
  isError: false
}


export const createUser = createAsyncThunk('userSlice/createUser', async ({ name, email, password }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password);
  
  console.log(data);
  await updateProfile(auth.currentUser, {
    displayName: name,
  })

  return {
    name: data.user.displayName,
    email: data.user.email
  };
})

export const signInUser = createAsyncThunk('userSlice/signInUser', async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Toaster('Your account has been created')
    
    return {
      name: userCredential.user.displayName,
      email: userCredential.user.email,
      
    };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error; 
  }
});



export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser : (state, {payload}) =>{
      state.name = payload.name,
      state.email = payload.email
    },
    toggleLoading : (state, {payload}) =>{
      state.isLoading = payload
    },
    logoutUser : (state, {payload}) =>{
      state.name = '',
      state.email = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.error = '';
      state.name = payload.name;
      state.email = payload.email;
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
      state.name = '';
      state.email = '';
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUser, toggleLoading, logoutUser } = userSlice.actions

export default userSlice.reducer