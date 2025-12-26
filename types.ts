export enum Category {
  GENERAL = 'عام',
  CIVIL = 'مدني',
  CRIMINAL = 'جنائي',
  PERSONAL_STATUS = 'أحوال شخصية'
}

export interface PetitionModel {
  id: string;
  title: string;
  category: Category;
  contentTemplate: string;
  defaultCourt?: string;
  defaultArticle?: string;
}

export interface PetitionFormData {
  userRole: 'محامي' | 'مقدم الطلب بنفسه';
  lawyerName: string;
  partyRole: string;
  customPartyRole: string;
  secondPartyRole: string;
  customSecondPartyRole: string;
  applicantName: string;
  applicantAddress: string;
  applicantPhone: string;
  defendantName: string;
  defendantAddress: string;
  defendantPhone: string;
  policeStation: string;
  investigator: string;
  prosecutor: string;
  courtName: string;
  judgeTitle: string;
  customJudgeTitle: string;
  caseNumber: string;
  subject: string;
  body: string;
  requests: string;
  fees: string;
  witnesses: string;
  documents: string;
  extraDetails: string;
  additionalStatement: string;
  // Font Settings
  fontFamily: string;
  customFontUrl: string;
}

export interface SavedPetition {
  id: string;
  timestamp: number;
  data: PetitionFormData;
}