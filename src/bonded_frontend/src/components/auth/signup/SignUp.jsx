import styles from './scss/_signup.module.scss'
import Input from '@/reusable/Input'
import Checkbox from '@/reusable/Checkbox'
import { useState, useEffect } from 'react'
import { SignUpFunction } from './SignUpFunction'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const {
        formData,
        accepted,
        handleInputChange,
        handleAccept,
        isFormValid
    } = SignUpFunction()

    const [storedSignUpData, setStoredSignUpData] = useState({})

    useEffect(() => {
        const data = localStorage.getItem('signupData')
        if (data) {
            try {
                setStoredSignUpData(JSON.parse(data))
            } catch {
                setStoredSignUpData({})
            }
        }
    }, [])

    const handleNext = () => {
        const { firstname, middlename, lastname, username } = formData
        localStorage.setItem(
            'signupData',
            JSON.stringify({ firstname, middlename, lastname, username })
        )
        navigate('/wizard/email')
    }

    return (
        <div className={styles.signUpContainer}>
            <div className={styles.header}>
                <p className={styles.title}>Let's get started</p>
            </div>

            <div className={styles.nameFields}>
                <Input
                    label='First name'
                    type='text'
                    id='firstname'
                    placeholder={storedSignUpData.firstname || 'Enter a firstname'}
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                />
                <Input
                    label='Middle name(s)'
                    type='text'
                    id='middlename'
                    placeholder={storedSignUpData.middlename || 'Enter a middlename'}
                    value={formData.middlename}
                    onChange={(e) => handleInputChange('middlename', e.target.value)}
                />
                <Input
                    label='Last name'
                    type='text'
                    id='lastname'
                    placeholder={storedSignUpData.lastname || 'Enter a lastname'}
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                />
            </div>

            <div className={styles.usernameField}>
                <Input
                    label='Username'
                    type='text'
                    id='username'
                    placeholder={storedSignUpData.username || 'Enter a username'}
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                />
            </div>

            <div className={styles.checkboxField}>
                <Checkbox
                    label='Accept the terms & conditions'
                    required={true}
                    checked={accepted}
                    onChange={handleAccept}
                />
            </div>

            <div className={styles.buttonField}>
                <button
                    className={styles.nextButton}
                    disabled={!isFormValid()}
                    onClick={handleNext}
                    type='button'
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default SignUp
