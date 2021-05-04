import React, {useState, useEffect, useCallback} from 'react'
import './assets/styles/style.css'
import {AnswersList, Chats} from "./components/index"
import FromDialog from "./components/Forms/FormDialog";
import {db} from './firebase/index'

const App = () => {
  // 回答コンポーネントに表示するでーた
  const [answers, setAnswers] = useState([]);
  // チャットコンポーネントに表示するデータ
  const [chats, setChats] = useState([]);
  // 現在の質問ID
  const [currentId, setCurrendId] = useState( "init");
  // 質問と回答のデータセット
  const [dataset, setDataset] = useState({});
  // 問い合わせフォーム用モーダルの開閉を管理
  const [open, setOpen] = useState(false);

// Function
// 問い合わせフォーム用モーダルを開くコールバック関数
const handleClickOpen = () => {
  setOpen(true)
};
// 問い合わせフォーム用モーダルを閉じるコールバック関数
const handleClose = useCallback( () => {
  setOpen(false)
}, [setOpen]);
// 新しいチャットを追加するコールバック関数
const addChats = (chat) => {
  setChats(prevChtas => {
      return [...prevChtas, chat]
  })
}
// 次の質問をチャットエリアに表示する関数
const displayNextQuestion = (nextQuestionId, nextDataset) => {
  // 選択された回答と次の質問をチャットに追加
  addChats({
    text: nextDataset.question,
    type: "question"
  })
  // 次の回答一覧をセット
  setAnswers(nextDataset.answers)
  // 現在の質問IDをセット
  setCurrendId(nextQuestionId)
}
// 回答が選択された時に呼ばれる関数
const selectAnswer = (selectedAnswer, nextQuestionId) => {
  switch(true) {
    // お問い合わせが選択された時
    case (nextQuestionId === 'contact'):
      handleClickOpen();
      break;

    // リンクが選択された時
    case (/^https:*/.test(nextQuestionId)):
      const a = document.createElement( 'a' );
      a.href  = nextQuestionId;
      a.target = '_blank';
      a.click();
      break;

    // 選択された回答をchatsに追加
    default:
      // 現在のチャット一覧を取得
      addChats({
        text: selectedAnswer,
        type: 'answer'
      })

      setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 600);
      break;
  }
}

// 最初の質問をチャットエリアに表示する
useEffect( () => {
  (async () => {
    const initDataset = {};

     // Fetch questions dataset from Firestore
    await db.collection('questions').get().then(snapshots => {
      snapshots.forEach( doc => {
        const id = doc.id
        const data = doc.data()
        initDataset[id] = data
      })
    })

    // Firestoreから取得したデータセットを反映
    setDataset(initDataset)
    displayNextQuestion(currentId, initDataset[currentId])
  })()
}, [])

// 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
useEffect(() => {
  const scrollArea = document.getElementById('scroll-area')
  if( scrollArea ) {
    scrollArea.scrollTop = scrollArea.scrollHeight
  }
})


  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FromDialog open={open} handleClose={handleClose} />
      </div>
    </section>
    );
}

export default App