"use client"
// pages/auth/index.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, InputAdornment, Tab, Tabs, TextField, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import signIn from './actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AuthError } from 'next-auth';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.text.primary,
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const Auth: NextPage = () => {
  const [error, setError] = useState('');
  const [isloading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const route = useRouter();
  const session = useSession()

  useEffect(()=>{
    if(session) route.push('/');
  },[session])


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setError("");
    setTabValue(newValue);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    try {
      const res = await signIn({id:'credentials',name:'Credentials'}, formData);
      if(res.error) throw new AuthError(res.error)
        route.push('/');
    } catch (error: any) {
      const errorMessage = error.message.split('Read more')[0].trim();
      setError(errorMessage)
    } finally {
      if(session) route.push('/');
      setTimeout(() => {setLoading(false)}, 1000);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    try {
      const res = await signIn({id:'register',name:'Register'}, formData );
      if(res.error) throw new AuthError(res.error)
      route.push('/');
    } catch (error: any) {
      const errorMessage = error.message.split('Read more')[0].trim();
      setError(errorMessage)
    } finally {
      if(session) route.push('/');
      setTimeout(() => {setLoading(false)}, 1000) }
  };

  return (
    <>
      <Head>
        <title>{tabValue === 0 ? 'Login' : 'Register'} | AutoCar</title>
      </Head>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            p: 4,
          }}
        >
          <Image priority width={500} height={200} src={'/logo.png'} alt={'Logo'} style={{ height: 'auto', width: '100%'}} />
          <Typography
            variant="h5"
            component="h1"
            align="center"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              my: 2
            }}
          >
            Bem vindo!
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="authentication tabs"
              centered
            >
              <StyledTab label="LOGIN" />
              <StyledTab label="REGISTER" />
            </StyledTabs>
          </Box>

          <Box>
            {error && <Alert  color='error'>{error}</Alert>}
          </Box>

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLogin}>
              <TextField
                disabled={isloading}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={isloading}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Typography
                  variant="body2"
                  component="a"
                  href="/auth/forgot-password"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forget Password?
                </Typography>
              </Box>
              <Button
                disabled={isloading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 1, textTransform: 'none' }}
              >
                Sign In
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleRegister}>
              <TextField
                disabled={isloading}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={isloading}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={isloading}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                disabled={isloading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 1, textTransform: 'none' }}
              >
                Register
              </Button>
            </form>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
};

export default Auth;