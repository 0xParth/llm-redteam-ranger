import { useState } from 'react';
import { Header } from '@/components/Header';
import { AttackCategories } from '@/components/AttackCategories';
import { ContinuousTester } from '@/components/ContinuousTester';
import { ResultsPanel } from '@/components/ResultsPanel';

export interface TestResult {
  id: string;
  prompt: string;
  response: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  vulnerability: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('prompt-injection');
  const [results, setResults] = useState<TestResult[]>([]);

  const addResult = (result: Omit<TestResult, 'id' | 'timestamp'>) => {
    const newResult: TestResult = {
      ...result,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setResults(prev => [newResult, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Categories */}
          <div>
            <AttackCategories 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Center Panel - Testing Interface */}
          <div>
            <ContinuousTester 
                selectedCategory={selectedCategory}
                onAddResult={addResult}
              />
          </div>

          {/* Right Panel - Results */}
          <div>
            <ResultsPanel results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
