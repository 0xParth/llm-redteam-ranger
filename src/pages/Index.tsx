
import { useState } from 'react';
import { Header } from '@/components/Header';
import { AttackCategories } from '@/components/AttackCategories';
import { PromptTester } from '@/components/PromptTester';
import { ConversationTester } from '@/components/ConversationTester';
import { ResultsPanel } from '@/components/ResultsPanel';
import { AttackTemplates } from '@/components/AttackTemplates';

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
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [testingMode, setTestingMode] = useState<'single' | 'conversation'>('single');

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
          {/* Left Panel - Categories and Templates */}
          <div className="space-y-6">
            <AttackCategories 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <AttackTemplates 
              category={selectedCategory}
              onSelectTemplate={setSelectedTemplate}
              selectedTemplate={selectedTemplate}
            />
          </div>

          {/* Center Panel - Testing Interface */}
          <div className="space-y-6">
            {/* Mode Selector */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Testing Mode
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setTestingMode('single')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    testingMode === 'single' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Single Prompt
                </button>
                <button
                  onClick={() => setTestingMode('conversation')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    testingMode === 'conversation' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Conversation
                </button>
              </div>
            </div>

            {/* Testing Component */}
            {testingMode === 'single' ? (
              <PromptTester 
                selectedCategory={selectedCategory}
                selectedTemplate={selectedTemplate}
                onAddResult={addResult}
              />
            ) : (
              <ConversationTester 
                selectedCategory={selectedCategory}
                onAddResult={addResult}
              />
            )}
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
