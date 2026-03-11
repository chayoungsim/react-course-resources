import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import './App.css'

function App() {
  return (
    <Container>
        <h1> 연락처 앱 </h1>
        <Grid container spacing={2}>
            <Grid size={6}>
                <ContactForm />
            </Grid>
            <Grid  clize={6}>
                <ContactList />
            </Grid>
        </Grid>
    </Container>
  )
}

export default App
