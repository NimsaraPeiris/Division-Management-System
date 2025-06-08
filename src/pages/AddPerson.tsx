import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import type { Adult, Child } from '../types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const AddPerson = () => {
  const [personType, setPersonType] = useState<'adult' | 'child'>('adult');
  const [formData, setFormData] = useState<Partial<Adult & Child>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context) return;

    try {
      if (personType === 'adult') {
        await context.addPerson(formData as Adult);
      } else {
        await context.addPerson(formData as Child);
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Success!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The new person has been added to the records.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => { setIsSubmitted(false); setFormData({}); }}>
                Add Another Person
              </Button>
              <Button onClick={() => navigate('/records')} variant="secondary">
                View All Records
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Add New Person</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <Button onClick={() => setPersonType('adult')} variant={personType === 'adult' ? 'default' : 'outline'} className="rounded-r-none">
              Adult
            </Button>
            <Button onClick={() => setPersonType('child')} variant={personType === 'child' ? 'default' : 'outline'} className="rounded-l-none">
              Child
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {personType === 'adult' ? (
              <>
                <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <Input type="text" name="nic" placeholder="NIC" onChange={handleChange} required />
                <Select onValueChange={(value) => handleSelectChange('gender', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" name="dob" onChange={handleChange} required />
                <Input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <Input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} />
                <Input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
              </>
            ) : (
              <>
                <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <Select onValueChange={(value) => handleSelectChange('gender', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" name="dob" onChange={handleChange} required />
                <Input type="text" name="parent_nic" placeholder="Parent's NIC" onChange={handleChange} required />
                <Input type="text" name="school" placeholder="School" onChange={handleChange} />
                <Input type="text" name="grade" placeholder="Grade" onChange={handleChange} />
              </>
            )}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPerson;