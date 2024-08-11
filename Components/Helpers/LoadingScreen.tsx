// tela de loading padrão
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Componente de tela de carregamento que exibe um indicador de progresso e uma mensagem
export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

// Estilos para a tela de carregamento
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // Faz com que a visualização cubra toda a tela
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        zIndex: 1000, // Garante que esteja acima de outras visualizações (se necessário)
    },
    text: {
        color: '#fff', // Cor do texto para contraste com o fundo
        marginTop: 10, // Espaço entre o indicador de carregamento e o texto
    },
});
