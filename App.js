import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons'; // Ícones
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [novaSubtarefa, setNovaSubtarefa] = useState('');
  const [graficoVisivel, setGraficoVisivel] = useState(false);

  const adicionarTarefa = () => {
    if (novaTarefa) {
      setTarefas([...tarefas, { id: Date.now().toString(), titulo: novaTarefa, concluida: false, subtarefas: [] }]);
      setNovaTarefa('');
    }
  };

  const adicionarSubtarefa = (idTarefa) => {
    if (novaSubtarefa) {
      setTarefas(prevTarefas =>
        prevTarefas.map(tarefa =>
          tarefa.id === idTarefa
            ? {
                ...tarefa,
                subtarefas: [...tarefa.subtarefas, { id: Date.now().toString(), titulo: novaSubtarefa, concluida: false }]
              }
            : tarefa
        )
      );
      setNovaSubtarefa('');
    }
  };

  const marcarTarefaConcluida = (idTarefa) => {
    setTarefas(prevTarefas =>
      prevTarefas.map(tarefa =>
        tarefa.id === idTarefa ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const marcarSubtarefaConcluida = (idTarefa, idSubtarefa) => {
    setTarefas(prevTarefas =>
      prevTarefas.map(tarefa =>
        tarefa.id === idTarefa
          ? {
              ...tarefa,
              subtarefas: tarefa.subtarefas.map(subtarefa =>
                subtarefa.id === idSubtarefa ? { ...subtarefa, concluida: !subtarefa.concluida } : subtarefa
              )
            }
          : tarefa
      )
    );
  };

  const excluirTarefa = (idTarefa) => {
    setTarefas(prevTarefas => prevTarefas.filter(tarefa => tarefa.id !== idTarefa));
  };

  const excluirSubtarefa = (idTarefa, idSubtarefa) => {
    setTarefas(prevTarefas =>
      prevTarefas.map(tarefa =>
        tarefa.id === idTarefa
          ? {
              ...tarefa,
              subtarefas: tarefa.subtarefas.filter(subtarefa => subtarefa.id !== idSubtarefa)
            }
          : tarefa
      )
    );
  };

  const calcularPorcentagemConcluida = (tarefa) => {
    const totalSubtarefas = tarefa.subtarefas.length;
    const subtarefasConcluidas = tarefa.subtarefas.filter(s => s.concluida).length;
    return totalSubtarefas === 0 ? 0 : Math.round((subtarefasConcluidas / totalSubtarefas) * 100);
  };

  const calcularPorcentagemGeral = () => {
    if (tarefas.length === 0) return 0;
    const totalPercent = tarefas.reduce((acc, tarefa) => acc + calcularPorcentagemConcluida(tarefa), 0);
    return Math.round(totalPercent / tarefas.length);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity onPress={adicionarTarefa}>
          <Feather name="plus-circle" size={30} color="#4c669f" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item: tarefa }) => (
          <View style={styles.tarefaContainer}>
            <Text style={tarefa.concluida ? styles.completa : styles.tarefa}>
              {tarefa.titulo} ({calcularPorcentagemConcluida(tarefa)}% concluído)
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => excluirTarefa(tarefa.id)}>
                <AntDesign name="delete" size={24} style={styles.deleteButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => marcarTarefaConcluida(tarefa.id)}>
                <AntDesign name={tarefa.concluida ? 'checkcircle' : 'checkcircleo'} size={24} style={styles.completeButton} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={tarefa.subtarefas}
              keyExtractor={(subItem) => subItem.id}
              renderItem={({ item: subtarefa }) => (
                <View style={styles.subtarefaContainer}>
                  <Text style={subtarefa.concluida ? styles.completa : styles.subtarefa}>
                    {subtarefa.titulo}
                  </Text>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => excluirSubtarefa(tarefa.id, subtarefa.id)}>
                      <AntDesign name="delete" size={20} style={styles.deleteButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => marcarSubtarefaConcluida(tarefa.id, subtarefa.id)}>
                      <AntDesign name={subtarefa.concluida ? 'checkcircle' : 'checkcircleo'} size={20} style={styles.completeButton} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Adicionar subtarefa..."
                value={novaSubtarefa}
                onChangeText={setNovaSubtarefa}
              />
              <TouchableOpacity onPress={() => adicionarSubtarefa(tarefa.id)}>
                <Feather name="plus-circle" size={30} color="#4c669f" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.graficoToggle} onPress={() => setGraficoVisivel(!graficoVisivel)}>
        <Text style={styles.graficoToggleText}>{graficoVisivel ? 'Ocultar Gráfico' : 'Exibir Gráfico'}</Text>
      </TouchableOpacity>

      {graficoVisivel && (
        <View style={styles.graficoContainer}>
          <ProgressChart
            data={{
              labels: ['Progresso Geral'],
              data: [calcularPorcentagemGeral() / 100],
            }}
            width={Dimensions.get('window').width - 80}
            height={225}
            strokeWidth={12}
            radius={50}
            chartConfig={{
              backgroundGradientFrom: '#4c669f',
              backgroundGradientTo: '#66c9de',
              color: (opacity = 1) => `rgba(72, 61, 139, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            hideLegend={false}
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}
