import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Clipboard, ArrowRightLeft } from 'lucide-react';

const LanguageTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' }
  ];

  const handleTranslate = () => {
    // In a real implementation, this would call a translation API
    // For demo purposes, we'll just append "[Translated]" to the text
    setTranslatedText(`${inputText} [Translated to ${languages.find(l => l.code === targetLanguage).name}]`);
  };

  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Language Translator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <Button
            onClick={swapLanguages}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate"
              className="w-full h-32 p-2 border rounded resize-none"
            />
            <Button
              onClick={() => copyToClipboard(inputText)}
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here"
              className="w-full h-32 p-2 border rounded resize-none bg-gray-50"
            />
            <Button
              onClick={() => copyToClipboard(translatedText)}
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleTranslate}
          className="w-full"
        >
          Translate
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguageTranslator;
