import styled from 'styled-components';

function ReplyList({ reReplyFlag, item, index }) {
    return (
        <div>
            {/* {reReplyFlag[index] ? (
                item.reReply.map((data) => (
                    <StyledReply>
                        {data.replyReplyContext}
                    </StyledReply>
                ))
            ) : (
                <StyledReply />
            )} */}
        </div>
    );
}
export default ReplyList;

const StyledReply = styled.div`
    width: '100%';
    height: '30px';
`;
