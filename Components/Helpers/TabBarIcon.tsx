// Componente TabBarIcon exibe um ícone de tab bar com opção de expansão
import { StyleSheet, View, Text } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface TabBarIconProps {
    iconName: string;
    size: number;
    color: string;
    name: string;
    shouldExpand: boolean;
}

export default function TabBarIcon(props: TabBarIconProps) {

    // Define cores de fundo e larguras dinâmicas com base no nome da aba
    const backgroundColors: {[key: string]: string} = {
        "Home": '#dffd19',
        "Dashboard": '#fdd27f',
        "Mood List": '#d0e5e6'
    };

    const backgroundWidths: {[key: string]: number} = {
        "Home": 110,
        "Dashboard": 130,
        "Mood List": 110
    };

    // Obtém as propriedades de cor e largura para o estilo dinâmico
    const containerBackgroundColor: string = backgroundColors[props.name];
    const containerBackgroundWidth: number = backgroundWidths[props.name];

    // Cria estilos dinâmicos para quando a aba está expandida
    const dynamicStyle = StyleSheet.create({
        containerExpanded: {
            ...styles.container,
            backgroundColor: containerBackgroundColor,
            width: containerBackgroundWidth,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black'
        }
    });

    return (
        <View style={props.shouldExpand ? dynamicStyle.containerExpanded : styles.container}>
            <FontAwesome 
                name={props.iconName} 
                size={props.size} 
                color={props.color} 
                style={styles.icon} 
            />
            {props.shouldExpand && 
                <Text style={styles.text}>{props.name}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    icon: {
        marginRight: 5,
        color: 'black'
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 1
    }
});
