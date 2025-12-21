
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

export interface FormData {
  userRole: 'محامي' | 'مقدم الطلب بنفسه';
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
  caseNumber: string;
  subject: string;
  body: string;
  requests: string;
  witnesses: string;
  documents: string;
  extraDetails: string;
  additionalStatement: string;
}
