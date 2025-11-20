export enum ControlStatus {
  CONTROLLED = "CONTROLLED",
  PRESCRIPTION_ONLY = "PRESCRIPTION_ONLY",
  OTC = "OTC",
  UNKNOWN = "UNKNOWN"
}

export interface DrugAnalysis {
  drugName: string;
  scientificName?: string;
  status: ControlStatus;
  classification: string;
  reason: string;
  legalImplications: string;
  commonUses: string[];
  safetyWarnings: string[];
}

export interface HistoryItem extends DrugAnalysis {
  id: string;
  timestamp: number;
}
