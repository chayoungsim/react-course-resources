import SubContainer from "@/components/layout/SubContainer";

export default function PostsLoading() {
  return (
    <SubContainer style={{ padding: '2rem', textAlign: 'center' }}>
        <div className="static">
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' ,textAlign:'center'}}>
                데이터를 열심히 가져오는 중입니다... 🚀
            </p>
        </div>      
    </SubContainer>
  );
}