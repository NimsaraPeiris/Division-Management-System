import { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import type { Person } from '../types';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const ViewRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'adult' | 'child'>('all');
  const [sort, setSort] = useState<'name' | 'date'>('date');
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const context = useContext(AppContext);

  const filteredAndSortedPersons = useMemo(() => {
    if (!context) return [];
    let persons = context.persons;

    if (filter !== 'all') {
      persons = persons.filter(p => (filter === 'adult' ? 'nic' in p : !('nic' in p)));
    }

    if (searchTerm) {
      persons = persons.filter(p =>
        Object.values(p).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    persons.sort((a, b) => {
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
    });

    return persons;
  }, [context, filter, searchTerm, sort]);

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
  };

  const handleDelete = async (id: number, type: 'adult' | 'child') => {
    if (!context) return;
    if (window.confirm('Are you sure you want to delete this record?')) {
      await context.deletePerson(id, type);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context || !editingPerson) return;
    await context.updatePerson(editingPerson);
    setEditingPerson(null);
  };

  if (editingPerson) {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Edit Person</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              {'nic' in editingPerson ? (
                <>
                  <Input value={editingPerson.name} onChange={e => setEditingPerson({ ...editingPerson, name: e.target.value })} />
                  <Input value={editingPerson.nic} disabled />
                  <Input value={editingPerson.address} onChange={e => setEditingPerson({ ...editingPerson, address: e.target.value })} />
                  <Input value={editingPerson.occupation} onChange={e => setEditingPerson({ ...editingPerson, occupation: e.target.value })} />
                  <Input value={editingPerson.contact} onChange={e => setEditingPerson({ ...editingPerson, contact: e.target.value })} />
                </>
              ) : (
                <>
                  <Input value={editingPerson.name} onChange={e => setEditingPerson({ ...editingPerson, name: e.target.value })} />
                  <Input value={editingPerson.school} onChange={e => setEditingPerson({ ...editingPerson, school: e.target.value })} />
                  <Input value={editingPerson.grade} onChange={e => setEditingPerson({ ...editingPerson, grade: e.target.value })} />
                </>
              )}
              <div className="flex gap-2">
                <Button type="submit" className="w-full">Update</Button>
                <Button onClick={() => setEditingPerson(null)} className="w-full" variant="secondary">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">View Records</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="adult">Adults</SelectItem>
            <SelectItem value="child">Children</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(value) => setSort(value as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedPersons.map(person => (
          <Card key={person.id} className={`${'nic' in person ? 'border-blue-500' : 'border-green-500'}`}>
            <CardHeader>
              <CardTitle>{person.name}</CardTitle>
              <CardDescription>{'nic' in person ? `NIC: ${person.nic}` : `Parent NIC: ${person.parent_nic}`}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Gender:</strong> {person.gender}</p>
              <p><strong>DOB:</strong> {person.dob}</p>
              {'nic' in person ? (
                <>
                  <p><strong>Address:</strong> {person.address}</p>
                  <p><strong>Occupation:</strong> {person.occupation}</p>
                  <p><strong>Contact:</strong> {person.contact}</p>
                </>
              ) : (
                <>
                  <p><strong>School:</strong> {person.school}</p>
                  <p><strong>Grade:</strong> {person.grade}</p>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEdit(person)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(person.id!, 'nic' in person ? 'adult' : 'child')}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewRecords;