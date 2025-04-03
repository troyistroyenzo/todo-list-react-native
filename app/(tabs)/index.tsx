import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  Dimensions,
  useColorScheme as reactUseColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Get color scheme once for the StyleSheet
const currentScheme = 'light'; // Default fallback
const windowHeight = Dimensions.get('window').height;

export default function TodoScreen() {
  // Get color scheme inside the component
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // State management
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // Add a task
  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  };

  // Toggle task completion
  const completeTask = (index: number) => {
    if (completedTasks.includes(index)) {
      // Remove from completed if already completed
      setCompletedTasks(completedTasks.filter(item => item !== index));
    } else {
      // Add to completed
      setCompletedTasks([...completedTasks, index]);
    }
  };

  // Render each task item
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity 
        style={[
          styles.item, 
          { backgroundColor: colorScheme === 'dark' ? '#1E1F20' : '#FFF' }
        ]} 
        onPress={() => completeTask(index)}
      >
        <View style={styles.itemLeft}>
          <View style={[
            styles.square, 
            completedTasks.includes(index) ? styles.completed : {}
          ]}>
            {completedTasks.includes(index) && 
              <IconSymbol name="checkmark" size={16} color="#fff" />
            }
          </View>
          <Text style={[
            styles.itemText, 
            { color: colors.text },
            completedTasks.includes(index) ? styles.completedText : {}
          ]}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? "light-content" : "dark-content"} />
      
      <View style={styles.tasksWrapper}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Tasks</Text>
        
        <View style={styles.stats}>
          <Text style={[styles.statsText, { color: colors.icon }]}>
            Total: {taskItems.length} | Remaining: {taskItems.length - completedTasks.length}
          </Text>
        </View>
        
        <View style={styles.items}>
          {taskItems.length > 0 ? (
            <FlatList
              data={taskItems}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: colors.icon }]}>
                No tasks yet. Add one below!
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Moved up from bottom to be more visible */}
      <View style={[
        styles.inputContainer, 
        { 
          backgroundColor: colorScheme === 'dark' ? 'rgba(30, 31, 32, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          borderTopColor: colorScheme === 'dark' ? '#2E2F30' : '#E8E8E8',
        }
      ]}>
        <TextInput 
          style={[
            styles.input, 
            { 
              backgroundColor: colorScheme === 'dark' ? '#1E1F20' : '#FFF',
              borderColor: colorScheme === 'dark' ? '#2E2F30' : '#C0C0C0',
              color: colors.text 
            }
          ]} 
          placeholder={'Write a task'} 
          placeholderTextColor={colors.icon}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={[
            styles.addWrapper,
            { 
              backgroundColor: colorScheme === 'dark' ? '#1E1F20' : '#FFF',
              borderColor: colorScheme === 'dark' ? '#2E2F30' : '#C0C0C0'
            }
          ]}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stats: {
    marginTop: 6,
    marginBottom: 16,
  },
  statsText: {
    fontSize: 16,
  },
  items: {
    marginTop: 10,
    flex: 1,
    marginBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
  },
  item: {
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completed: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 260,
    height: 60,
    borderRadius: 60,
    borderWidth: 1,
    fontSize: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addText: {
    fontSize: 32,
    color: '#0a7ea4',
  },
});