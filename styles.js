import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b3e5fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Cor do texto no degradê
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  tarefaContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  tarefa: {
    fontSize: 18,
    color: '#333',
  },
  completa: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#777',
  },
  subtarefaContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#e3f2fd', // Azul suave
    borderRadius: 5,
    padding: 10,
  },
  subtarefa: {
    fontSize: 16,
    color: '#555',
  },
  graficoContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const chartConfig = {
  backgroundGradientFrom: '#b3e5fc', // Azul suave claro
  backgroundGradientTo: '#29b6f6', // Azul um pouco mais forte, mas ainda suave
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor dos dados no gráfico
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#fff',
  },
};
