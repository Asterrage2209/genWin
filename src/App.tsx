import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { UploadDocuments } from './pages/UploadDocuments';
import { DataExtraction } from './pages/DataExtraction';
import { FinancialAnalysis } from './pages/FinancialAnalysis';
import { WorkbookGenerator } from './pages/WorkbookGenerator';
import { InsightsAnomalies } from './pages/InsightsAnomalies';
import { FinancialInsights } from './pages/FinancialInsights';

export type GeneratedModel = {
  name: string;
  date: string;
  size: string;
};

const DEFAULT_MODELS: GeneratedModel[] = [
  { name: 'Acme_Corp_Three_Statement_Model', date: 'Oct 24, 2023', size: '1.2 MB' },
  { name: 'TechGlobal_DCF_Analysis', date: 'Oct 22, 2023', size: '0.8 MB' },
  { name: 'RetailNet_LBO_Model_Draft', date: 'Oct 15, 2023', size: '2.4 MB' },
];

function App() {
  const [activePath, setActivePath] = useState('dashboard');
  const [models, setModels] = useState<GeneratedModel[]>(DEFAULT_MODELS);

  const handleDocumentProcessed = (fileName: string) => {
    const baseName = fileName.replace(/\.[^/.]+$/, ""); // remove extension
    const newModel: GeneratedModel = {
      name: baseName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: '1.5 MB'
    };
    setModels([newModel, ...models]);
  };

  const renderPage = () => {
    switch (activePath) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload-documents':
        return <UploadDocuments onNavigate={setActivePath} onDocumentProcessed={handleDocumentProcessed} />;
      case 'data-extraction':
        return <DataExtraction />;
      case 'financial-analysis':
        return <FinancialAnalysis />;
      case 'workbook-generator':
        return <WorkbookGenerator models={models} />;
      case 'financial-insights':
        return <FinancialInsights />;
      case 'insights-anomalies':
        return <InsightsAnomalies />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout activePath={activePath} onNavigate={setActivePath}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
