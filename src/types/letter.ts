export type LetterTone = 'formal' | 'sangat_formal' | 'ringkas';

export type LetterCategory = 'kerja' | 'pelajar' | 'aduan_rayuan' | 'perniagaan' | 'komuniti';

export interface LetterTemplate {
  id: string;
  category: LetterCategory;
  name: string;
  description: string;
  defaultSubject: string;
  defaultSalutation: string;
  suggestedClosing: string;
  guidance: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    type?: 'text' | 'textarea' | 'date';
    required?: boolean;
    helperText?: string;
  }[];
}

export interface LetterFormData {
  templateId: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  senderAddress: string;
  
  recipientTitle: string;
  recipientCompany: string;
  recipientAddress: string;
  salutation: string;
  
  letterDate: string;
  refNo?: string;
  tone: LetterTone;
  
  subject: string;
  specificData: Record<string, string>;
  additionalNotes?: string;
}

export interface GeneratedLetter {
  senderBlock: string;
  recipientBlock: string;
  dateAndRef: {
    date: string;
    refNo?: string;
  };
  salutation: string;
  subject: string;
  paragraphs: string[];
  closing: string;
  signatureBlock: {
    phrase: string;
    name: string;
    designation?: string;
  };
  fullFormattedText: string;
}
