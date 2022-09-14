import Card from 'modules/Card';

const Guide = () => {
  return (
    <Card>
      <h2 className='mb-6 text-center text-xl'>操作教學</h2>
      <p className='text-lg'>
        使用 [ WSAD or 方向鍵 ]
        移動到湖邊、樹、石頭，當右下角動作鍵亮起，點擊或使用
        [ Space ]
        進行採集，則採集所獲得的物品可以進入木屋內找尋 NPC
        進行抽獎。
      </p>
    </Card>
  );
};

export default Guide;
