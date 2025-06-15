import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Review.css";
import axios from "axios";

const AddReviewComponent = ({
  show,
  onHide,
  national_park_no,
  track_no,
  member_id
}) => {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewNo, setEditingReviewNo] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    if (show) {
      axios
        .get("/review/get_list_track", {
          params: { national_park_no, track_no }
        })
        .then((res) => {
          const myReviews = res.data.filter(
            (r) => r.member_id === member_id
          );
          setReviews(myReviews);
          setSelectedReviewIndex(null);
          setIsEditing(false);
          setEditingReviewNo(null);
        })
        .catch((err) => {
          console.error("리뷰 목록 불러오기 실패", err);
        });
    }
  }, [show]);

  const handleSubmit = async () => {
    const trimmed = reviewText.trim();
    if (trimmed === "") return;

    try {
      if (isEditing && editingReviewNo !== null) {
        // PUT 요청 (수정)
        await axios.put("/review/modify", {
          review_no: editingReviewNo,
          review_content: trimmed
        });
      } else {
        // POST 요청 (추가)
        await axios.post("/review/add", {
          national_park_no,
          track_no,
          member_id,
          review_content: trimmed
        });
      }

      // 상태 초기화 후 목록 새로고침
      setReviewText("");
      setIsEditing(false);
      setEditingReviewNo(null);
      setCurrentPage(1);
      setSelectedReviewIndex(null);

      const refreshed = await axios.get("/review/get_list_track", {
        params: { national_park_no, track_no }
      });
      const myReviews = refreshed.data.filter(
        (r) => r.member_id === member_id
      );
      setReviews(myReviews);

    } catch (error) {
      console.error("리뷰 처리 실패:", error.response?.data || error.message);
      alert("리뷰 저장 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    const review = displayedReviews[selectedReviewIndex];
    if (!review || !window.confirm("선택한 리뷰를 삭제할까요?")) return;

    try {
      // DELETE 요청 시 데이터는 config 객체에 `data`로 넣어야 함
      await axios.delete("/review/delete", {
        data: { review_no: review.review_no }
      });

      setReviews((prev) =>
        prev.filter((r) => r.review_no !== review.review_no)
      );
      setSelectedReviewIndex(null);
    } catch (error) {
      console.error("삭제 실패", error);
      alert("리뷰 삭제 중 오류가 발생했습니다.\n" + (error.response?.data || error.message));
    }
  };

  const handleEdit = () => {
    const review = displayedReviews[selectedReviewIndex];
    if (!review) return;
    setReviewText(review.review_content);
    setIsEditing(true);
    setEditingReviewNo(review.review_no);
  };

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const displayedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>내 리뷰 관리</Modal.Title>
      </Modal.Header>

      <Modal.Body className="ScrollableBody">
        {displayedReviews.length === 0 ? (
          <div>작성한 리뷰가 없습니다.</div>
        ) : (
          displayedReviews.map((review, idx) => (
            <div key={idx} className="ReviewRow">
              <input
                type="radio"
                name="selectedReview"
                checked={selectedReviewIndex === idx}
                onChange={() => setSelectedReviewIndex(idx)}
                className="ReviewRadio"
              />
              <div className="ReviewTextWrapper">
                <div className="SpeechBubble">{review.review_content}</div>
              </div>
            </div>
          ))
        )}
      </Modal.Body>

      <Modal.Footer>
        <div className="PaginationWrapper">
          <button
            className="PaginationNav"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`PaginationButton ${
                page === currentPage ? "ActivePage" : ""
              }`}
              onClick={() => {
                setCurrentPage(page);
                setSelectedReviewIndex(null);
              }}
            >
              {page}
            </button>
          ))}
          <button
            className="PaginationNav"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </Modal.Footer>

      <Modal.Body>
        <textarea
          className="ReviewTextArea"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="새 리뷰를 입력해주세요."
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
        <Button
          variant="outline-primary"
          onClick={handleEdit}
          disabled={selectedReviewIndex === null}
        >
          수정
        </Button>
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          disabled={selectedReviewIndex === null}
          className="Delete"
        >
          삭제
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? "수정 완료" : "리뷰 추가"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReviewComponent;
