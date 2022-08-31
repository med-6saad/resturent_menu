import React, { useRef } from "react";
import styles from './login.module.css';
import SvgLogin from './SvgLogin';
import {Link} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { loginCalls } from "../../apiCalls";
import {useContext} from 'react';
import {useNavigate} from 'react-router';
function Login(){
    const navigate=useNavigate()
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);
    const handleClick= async(e)=>{
        e.preventDefault();       
        loginCalls({email:email.current.value,password:password.current.value},dispatch);
        navigate('/admin')
    }
    return (
        <div className={styles.containerLogin}>
            <div className={styles.wrapper}>
                <div className={styles.leftWrapper}>
                    <SvgLogin/>
                    <Link to={'/register'}>
                        <h3 className={styles.createAccount}>Create an account</h3>
                    </Link>
                </div>
                <div className={styles.rightWrapper}>
                    <h1 className={styles.signup}>Log In</h1>
                    <form className={styles.formLogin} onSubmit={handleClick}>
                        <div>
                            <div className={styles.emailContainer}>
                                <img src="/assets/images/email.png" alt="" className={styles.icons} />
                                <input type="email" name="email" ref={email} placeholder="Your Email" className={styles.inputLogin}/>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div>
                            <div className={styles.passwordContainer}>
                                <img src="/assets/images/password.png" alt="" className={styles.icons} />
                                <input type="password" name="password" ref={password} placeholder="Your Password" className={styles.inputLogin}/>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <button type='submit' className={styles.submitLogin}>submit</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}
export default Login;