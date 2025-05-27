
import { 
  Zap, 
  Lock, 
  Eye, 
  MessageSquare, 
  Brain, 
  Target,
  Database,
  Users
} from 'lucide-react';

interface AttackCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  {
    id: 'prompt-injection',
    name: 'Prompt Injection',
    icon: Zap,
    description: 'Bypass system instructions',
    severity: 'high'
  },
  {
    id: 'jailbreaking',
    name: 'Jailbreaking',
    icon: Lock,
    description: 'Circumvent safety measures',
    severity: 'critical'
  },
  {
    id: 'data-extraction',
    name: 'Data Extraction',
    icon: Database,
    description: 'Extract training data',
    severity: 'high'
  },
  {
    id: 'privacy-leakage',
    name: 'Privacy Leakage',
    icon: Eye,
    description: 'Reveal sensitive information',
    severity: 'medium'
  },
  {
    id: 'manipulation',
    name: 'Social Manipulation',
    icon: Users,
    description: 'Influence user behavior',
    severity: 'medium'
  },
  {
    id: 'reasoning-flaws',
    name: 'Reasoning Flaws',
    icon: Brain,
    description: 'Exploit logical weaknesses',
    severity: 'low'
  },
  {
    id: 'adversarial',
    name: 'Adversarial Prompts',
    icon: Target,
    description: 'Crafted malicious inputs',
    severity: 'high'
  },
  {
    id: 'roleplay',
    name: 'Roleplay Attacks',
    icon: MessageSquare,
    description: 'Assume harmful personas',
    severity: 'medium'
  }
];

const severityColors = {
  low: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  medium: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
  high: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
  critical: 'border-red-500/30 bg-red-500/10 text-red-400'
};

export const AttackCategories = ({ selectedCategory, onSelectCategory }: AttackCategoriesProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Attack Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                isSelected 
                  ? 'border-red-500 bg-red-500/10 text-red-400' 
                  : `${severityColors[category.severity]} hover:bg-gray-700/50`
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{category.description}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full border ${severityColors[category.severity]}`}>
                  {category.severity}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
