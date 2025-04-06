import React from "react";
import ReactMarkdown from "react-markdown";

interface FormattedAIResponseProps {
  response: string;
}

const FormattedAIResponse: React.FC<FormattedAIResponseProps> = ({ response }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold border-b border-gray-600 pb-2">AI Response</h2>
      <div className="prose prose-invert">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};

export default FormattedAIResponse;