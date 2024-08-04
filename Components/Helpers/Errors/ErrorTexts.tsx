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

const styles = StyleSheet.create({
  errorLabel: {
    color: `red`
  }
})