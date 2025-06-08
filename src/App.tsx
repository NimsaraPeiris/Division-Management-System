import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import AddPerson from './pages/AddPerson';
import ViewRecords from './pages/ViewRecords';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <header className="bg-background border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link to="/" className="text-lg font-bold">Person Registry</Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">Home</Link>
                <Link to="/add" className="text-muted-foreground transition-colors hover:text-foreground">Add Person</Link>
                <Link to="/records" className="text-muted-foreground transition-colors hover:text-foreground">View Records</Link>
              </nav>
            </div>
          </header>
          <main className="flex-grow bg-muted/40">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddPerson />} />
              <Route path="/records" element={<ViewRecords />} />
            </Routes>
          </main>
          <footer className="bg-background border-t">
            <div className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
              © 2024 Person Registry. All rights reserved.
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
