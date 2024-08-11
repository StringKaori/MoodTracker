// componente facilitador para criar labels 
// de erro e exporta-lás

import { StyleSheet, Text } from 'react-native';

interface SimpleLabelPropType {
    text: string
}

function SimpleLabel(props: SimpleLabelPropType) {
    return(
        <Text style={ styles.errorLabel }>
            {props.text}
        </Text>
    );
}

// Errors exports
export function EmptyFieldError() {
    return(
        <SimpleLabel text={"This field can't be empty!"}/>
    );
}

export function EmailOrPasswordIsWrongError() {
    return(
        <SimpleLabel text={"Invalid email or password"}/>
    );
}

export function DifferentPasswordsError() {
    return(
        <SimpleLabel text={"Password must be the same!"}/>
    )
}

export function InvalidEmailError() {
    return(
        <SimpleLabel text={"This is not a valid email!"}/>
    );
}

export function UnnavailableEmailError() {
    return(
        <SimpleLabel text={"This email is already being used!"}/>
    );
}

export function UnnavailableUsernameError() {
    return(
        <SimpleLabel text={"This username is already being used!"}/>
    );
}

export function CharacterLimitReached(props: {limit: number}) {
    return(
        <SimpleLabel text={`You've reached the ${props.limit} character limit!`}/>
    );
}

export function NoMoodSelectedError() {
    return(
        <SimpleLabel text={`You have to select a mood to proceed!`}/>
    );
}

export function NoNotesTaken() {
    return(
        <SimpleLabel text={`"What a pity, you didn't take any notes this day :/"`}/>
    );
}

const styles = StyleSheet.create({
  errorLabel: {
    color: `red`
  }
})