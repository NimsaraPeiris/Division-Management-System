import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Users, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Home = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { persons } = context;
  const totalAdults = persons.filter(p => 'nic' in p).length;
  const totalChildren = persons.filter(p => !('nic' in p)).length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Adults</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdults}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChildren}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{persons.length}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Person</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add a new adult or child record.</p>
            <Link to="/add">
              <Button className="mt-4">
                <UserPlus className="mr-2 h-4 w-4" /> Add Person
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>View Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search, filter, and manage all records.</p>
            <Link to="/records">
              <Button className="mt-4">
                <FileText className="mr-2 h-4 w-4" /> View Records
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;