
import { Character, Question, GameStage } from './types';

export const CHARACTERS: Character[] = [
  { id: '1', name: 'البطل الشجاع', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=b6e3f4', color: 'bg-blue-400' },
  { id: '2', name: 'البطلة الذكية', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aria&backgroundColor=ffdfbf', color: 'bg-pink-400' },
  { id: '3', name: 'المغامر القوي', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Caleb&backgroundColor=c0aede', color: 'bg-green-400' },
  { id: '4', name: 'المبدعة الصغيرة', image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mimi&backgroundColor=ffd5dc', color: 'bg-yellow-400' },
];

export const QUESTIONS: Record<GameStage, Question[]> = {
  [GameStage.HOME]: [
    {
      id: 1,
      text: "ماذا تفعل إذا رأيت سلكاً كهربائياً مكشوفاً في الصالة؟",
      options: ["ألمسه بيدي", "أبتعد عنه وأخبر أمي أو أبي فوراً", "أحاول تغطيته بلعبة"],
      correctIndex: 1,
      imagePrompt: "A 3D cartoon child in a cozy living room, standing safely at a distance and pointing at a broken electrical wire on the floor that has small blue sparks. The child looks cautious and responsible.",
      feedback: "رائع! الكهرباء خطيرة جداً، وإخبار الكبار هو تصرف الأبطال."
    },
    {
      id: 2,
      text: "أين المكان الصحيح لحفظ الأدوية والمنظفات؟",
      options: ["تحت المغسلة", "في خزانة عالية ومغلقة", "بجانب السرير"],
      correctIndex: 1,
      imagePrompt: "A 3D cartoon image of a white kitchen cabinet mounted high on the wall, filled with colorful medicine bottles and cleaning sprays, with a small safety lock on the door. No text.",
      feedback: "صحيح تماماً! يجب أن تكون الأدوية بعيدة عن متناول أيدينا."
    },
    {
      id: 3,
      text: "دق جرس الباب وأنت وحدك في المنزل، ماذا تفعل؟",
      options: ["أفتح الباب فوراً", "أنظر من العين السحرية ولا أفتح للغرباء", "أرحب بالطارق وأدخله"],
      correctIndex: 1,
      imagePrompt: "A smart 3D cartoon girl standing on a wooden stool inside the house, looking carefully through the door peephole. A large secure front door is visible. Bright and safe atmosphere.",
      feedback: "أنت بطل حذر! لا تفتح الباب أبداً إلا لمن تعرفه جيداً."
    },
    {
      id: 4,
      text: "هل مسموح لنا اللعب بأعواد الكبريت أو الولاعة؟",
      options: ["نعم، النار جميلة", "لا، النار تسبب الحرائق وتؤذينا", "فقط في غرفتي"],
      correctIndex: 1,
      imagePrompt: "A table with a box of matches and a lighter. A friendly cartoon character is making a 'No' gesture with their hands. A large red translucent circle is behind the items to signify danger.",
      feedback: "بطل السلامة! النار ليست لعبة أبداً."
    },
    {
      id: 5,
      text: "رأيت سكيناً حادة على طاولة المطبخ، كيف تتصرف؟",
      options: ["أجرب تقطيع التفاح", "أتركها في مكانها وأبتعد عنها", "ألعب بها كأنها سيف"],
      correctIndex: 1,
      imagePrompt: "A 3D cartoon kitchen scene showing a shiny knife lying on a kitchen table. A small child is walking away from the table, keeping a safe distance and looking for an adult.",
      feedback: "إجابة ذكية! الأدوات الحادة للجرح وليست للمرح."
    }
  ],
  [GameStage.STREET]: [
    {
      id: 11,
      text: "من أين نعبر الطريق بأمان يا بطل؟",
      options: ["من بين السيارات المسرعة", "من ممر المشاة عندما تكون الإشارة خضراء", "أركض بأقصى سرعة"],
      correctIndex: 1,
      imagePrompt: "A 3D cartoon city street with a white zebra crossing (pedestrian crossing). A green traffic light is shining, and a child is happily walking across the crossing holding an adult's hand.",
      feedback: "ممتاز! ممر المشاة هو طريق الأمان لكل الأبطال."
    },
    {
      id: 12,
      text: "ماذا تفعل إذا عرض عليك شخص غريب قطعة حلوى؟",
      options: ["آخذها وأشكره", "أرفض بأدب وأبتعد عنه بسرعة", "أذهب معه لمنزله"],
      correctIndex: 1,
      imagePrompt: "A 3D cartoon boy in a sunny park, bravely holding his hand out in a 'stop' gesture towards a shadowed mysterious person offering a candy. The boy is turning back to his family.",
      feedback: "تصرف بطولي! لا نقبل الهدايا من الغرباء أبداً."
    }
  ]
};
