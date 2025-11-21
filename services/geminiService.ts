import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MENU_ITEMS = `
【PIZZA】
- 新潟県産豚の自家製サルシッチャとスイートバジルとレモン (爽やか, 肉, オイル系)
- 完熟トマトたっぷりマルゲリータ (定番, トマト, チーズ)
- 熟成芋と自家製リコッタチーズのクアトロフォルマッジ (濃厚, チーズ, 甘み)
- 3種の海鮮クリームピッツァ (シーフード, クリーム, 期間限定)
- 保内野菜と熟成生ハムのサラダピッツァ (ヘルシー, 野菜, さっぱり)

【PASTA】
- 完熟トマトとマスカルポーネクリームのトマトソース (トマト, クリーム, まろやか)
- じっくりローストした玉ねぎとパンチェッタのトマトクリーム (濃厚, トマトクリーム, 肉)
- アンチョビツナとキノコのペペロンチーノ (オイル, きのこ, 大人向け)
- 海老の濃厚ビスクソース (シーフード, 濃厚, リッチ)
- 山長ベーコンとグリーンアスパラガスのカルボナーラ (濃厚, チーズ, 肉)
- あさりとにんにくバターのトマトスープボンゴレ (スープ, シーフード, さっぱり)
- 国産牛の自家製ミートソース (肉, トマト, ボリューミー)
- ローストチキンと九条ネギのパスタ (和風, 肉, ネギ)
`;

export const getDishRecommendation = async (answers: string[]): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  const prompt = `
    あなたはパスタとピザの店「Base (バーゼ)」の親切な店員です。
    お客様が今の気分や好みに関する5つの質問に答えました。
    
    以下の「当店のメニュー」の中から、お客様に最も適した一皿（ピザまたはパスタ）を選んで提案してください。

    【当店のメニュー】
    ${MENU_ITEMS}
    
    【お客様の回答】
    1. 今の気分: ${answers[0]}
    2. お腹の空き具合: ${answers[1]}
    3. 好みの味: ${answers[2]}
    4. メイン食材の希望: ${answers[3]}
    5. ピザかパスタか: ${answers[4]}

    【制約事項】
    - 必ず上記のメニューリストにある正確な料理名を提案してください。
    - 日本語で答えてください。
    - 料理名を目立たせてください。
    - なぜその料理がおすすめなのか、食欲をそそるような説明を添えてください。
    - 親しみやすく、丁寧な接客口調で話してください。
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "申し訳ありません、ただいまおすすめを考え中です。もう一度お試しください。";
  } catch (error) {
    console.error("Error getting recommendation:", error);
    throw new Error("Failed to get recommendation.");
  }
};

export const editFoodImage = async (imageBase64: string, instructions: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  // Remove header if present (e.g., "data:image/png;base64,")
  const cleanBase64 = imageBase64.split(',')[1];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Nano banana model
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG or JPEG, generally standardizes
              data: cleanBase64
            }
          },
          {
            text: `Edit this food image. Instruction: ${instructions}. Return only the image.`
          }
        ]
      }
    });

    // Extract image from response
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error editing image:", error);
    throw new Error("Failed to edit image.");
  }
};