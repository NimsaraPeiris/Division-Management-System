import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Person } from '../types';
import { supabase } from '../supabaseClient';

interface AppContextProps {
  persons: Person[];
  addPerson: (person: Person) => Promise<void>;
  updatePerson: (person: Person) => Promise<void>;
  deletePerson: (id: number, type: 'adult' | 'child') => Promise<void>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data: adults, error: adultError } = await supabase.from('adults').select('*');
      if (adultError) console.error('Error fetching adults:', adultError);

      const { data: children, error: childError } = await supabase.from('children').select('*');
      if (childError) console.error('Error fetching children:', childError);

      if (adults && children) {
        setPersons([...adults, ...children]);
      }
    };
    fetchPersons();
  }, []);

  const addPerson = async (person: Person) => {
    if ('nic' in person) {
      const { data, error } = await supabase.from('adults').insert([person]).select();
      if (error) throw error;
      if (data) setPersons([...persons, ...data]);
    } else {
      const { data, error } = await supabase.from('children').insert([person]).select();
      if (error) throw error;
      if (data) setPersons([...persons, ...data]);
    }
  };

  const updatePerson = async (person: Person) => {
    if ('nic' in person) {
      const { data, error } = await supabase.from('adults').update(person).eq('id', person.id).select();
      if (error) throw error;
      if (data) {
        setPersons(persons.map(p => (p.id === person.id ? data[0] : p)));
      }
    } else {
      const { data, error } = await supabase.from('children').update(person).eq('id', person.id).select();
      if (error) throw error;
      if (data) {
        setPersons(persons.map(p => (p.id === person.id ? data[0] : p)));
      }
    }
  };

  const deletePerson = async (id: number, type: 'adult' | 'child') => {
    const table = type === 'adult' ? 'adults' : 'children';
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    setPersons(persons.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ persons, addPerson, updatePerson, deletePerson }}>
      {children}
    </AppContext.Provider>
  );
};