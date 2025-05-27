
import { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Clock, Filter, Download } from 'lucide-react';
import { TestResult } from '@/pages/Index';

interface ResultsPanelProps {
  results: TestResult[];
}

const severityIcons = {
  low: CheckCircle,
  medium: AlertCircle,
  high: AlertCircle,
  critical: XCircle
};

const severityColors = {
  low: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  critical: 'text-red-400 bg-red-500/10 border-red-500/30'
};

export const ResultsPanel = ({ results }: ResultsPanelProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const filteredResults = results.filter(result => 
    filter === 'all' || result.severity === filter
  );

  const severityCounts = results.reduce((acc, result) => {
    acc[result.severity] = (acc[result.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'red-team-results.json';
    link.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Test Results</h2>
        <button
          onClick={exportResults}
          disabled={results.length === 0}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Export results"
        >
          <Download className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {Object.entries(severityCounts).map(([severity, count]) => (
          <div key={severity} className={`p-3 rounded-lg border ${severityColors[severity as keyof typeof severityColors]}`}>
            <div className="text-sm font-medium capitalize">{severity}</div>
            <div className="text-2xl font-bold">{count}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredResults.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No test results yet.</p>
            <p className="text-sm">Start testing to see results here.</p>
          </div>
        ) : (
          filteredResults.map((result) => {
            const SeverityIcon = severityIcons[result.severity];
            const isExpanded = expandedResult === result.id;
            
            return (
              <div
                key={result.id}
                className={`border rounded-lg p-4 transition-all duration-200 ${severityColors[result.severity]} cursor-pointer hover:bg-gray-700/20`}
                onClick={() => setExpandedResult(isExpanded ? null : result.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <SeverityIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white">{result.vulnerability}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {result.category} • {result.timestamp.toLocaleTimeString()}
                      </div>
                      {isExpanded && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <div className="text-sm font-medium text-gray-300 mb-1">Prompt:</div>
                            <div className="text-sm text-gray-200 bg-gray-700/50 p-2 rounded">
                              {result.prompt}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-300 mb-1">Response:</div>
                            <div className="text-sm text-gray-200 bg-gray-700/50 p-2 rounded">
                              {result.response}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full border ${severityColors[result.severity]}`}>
                    {result.severity}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
