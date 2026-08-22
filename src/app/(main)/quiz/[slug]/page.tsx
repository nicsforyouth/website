import { getQuizBySlug } from "@/lib/quizzes";
import QuizViewBox from "@/components/quiz/QuizViewBox";

const Quiz = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <>
      <div className="min-h-screen pt-12 px-6 pb-12">
        <QuizViewBox quiz={quiz} />
      </div>
    </>
  );
};

export default Quiz;
