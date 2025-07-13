"use client";
import { Pencil, Search, Trash2 } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
interface Comment {
  id: number;
  content: string;
  author: string;
  email: string;
  post: string;
  postId: string;
  date: string;
  status: string;
  reply: string;
}
type BlogPostOption = { value: string; label: string };

// Dummy data for comments
const initialComments = [
  {
    id: 1,
    content: "This is a great article! Very insightful and well-written.",
    author: "Alice Smith",
    email: "alice.s@example.com",
    post: "The Future of AI",
    postId: "post-1",
    date: "2023-10-26 10:30 AM",
    status: "approved",
    reply: "",
  },
  {
    id: 2,
    content:
      "I have a question about the third point you made. Could you elaborate?",
    author: "Bob Johnson",
    email: "bob.j@example.com",
    post: "Mastering Web Development",
    postId: "post-2",
    date: "2023-10-26 11:15 AM",
    status: "pending",
    reply: "",
  },
  {
    id: 3,
    content: "Spammy comment with irrelevant links. Buy our products!",
    author: "Spam Bot",
    email: "spam@example.com",
    post: "Healthy Eating Habits",
    postId: "post-3",
    date: "2023-10-25 09:00 PM",
    status: "spam",
    reply: "",
  },
  {
    id: 4,
    content: "Thanks for sharing these tips, they are really helpful!",
    author: "Charlie Brown",
    email: "charlie.b@example.com",
    post: "The Future of AI",
    postId: "post-1",
    date: "2023-10-25 03:45 PM",
    status: "approved",
    reply: "You're very welcome, Charlie! Glad you found them useful.",
  },
  {
    id: 5,
    content:
      "I disagree with some of your conclusions. More research is needed.",
    author: "Diana Prince",
    email: "diana.p@example.com",
    post: "The Future of AI",
    postId: "post-1",
    date: "2023-10-24 07:20 AM",
    status: "pending",
    reply: "",
  },
  {
    id: 6,
    content:
      "Great insights on healthy eating! I've been looking for practical advice like this.",
    author: "Eve Adams",
    email: "eve.a@example.com",
    post: "Healthy Eating Habits",
    postId: "post-3",
    date: "2023-10-24 09:50 AM",
    status: "approved",
    reply: "",
  },
  {
    id: 7,
    content: "This web development guide is a lifesaver for beginners!",
    author: "Frank Green",
    email: "frank.g@example.com",
    post: "Mastering Web Development",
    postId: "post-2",
    date: "2023-10-23 02:10 PM",
    status: "approved",
    reply: "",
  },
  {
    id: 8,
    content: "Unwanted commercial advertisement. Click here for discounts!",
    author: "Ad Bot",
    email: "ad@example.com",
    post: "The Future of AI",
    postId: "post-1",
    date: "2023-10-22 06:00 PM",
    status: "spam",
    reply: "",
  },
];
const tableHeaders = [
  { label: "Comment" },
  { label: "Author" },
  { label: "Post" },
  { label: "Date" },
  { label: "Status" },
  { label: "Actions", className: "rounded-tr-lg" },
];

const blogPostsOptions: BlogPostOption[] = [
  { value: "all", label: "All Blog Posts" },
  { value: "post-1", label: "The Future of AI" },
  { value: "post-2", label: "Mastering Web Development" },
  { value: "post-3", label: "Healthy Eating Habits" },
];
const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trashed", label: "Trashed" },
];
const bulkActions = [
  { value: "", label: "Bulk Actions" },
  { value: "approve", label: "Approve" },
  { value: "unapprove", label: "Unapprove" },
  { value: "spam", label: "Mark as Spam" },
  { value: "delete", label: "Delete" },
];
// Helper function to get status badge classes
const getStatusClasses = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "spam":
      return "bg-red-100 text-red-800";
    case "trashed":
      return "bg-gray-100 text-gray-800";
    default:
      return "";
  }
};

const Comments = () => {
  const [comments, setComments] = useState(initialComments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [postFilter, setPostFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState({} as Comment);
  const [modalCommentContent, setModalCommentContent] = useState("");
  const [modalReplyContent, setModalReplyContent] = useState("");
  const [selectedCommentIds, setSelectedCommentIds] = useState<number[]>([]); // For bulk actions

  // Filtered comments based on search and filters
  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      const matchesSearch =
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || comment.status === statusFilter;
      const matchesPost = postFilter === "all" || comment.postId === postFilter;
      return matchesSearch && matchesStatus && matchesPost;
    });
  }, [comments, searchTerm, statusFilter, postFilter]);

  // Open modal and set selected comment details
  const openCommentDetailModal = (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setSelectedComment(comment);
      setModalCommentContent(comment.content);
      setModalReplyContent(comment.reply);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeCommentDetailModal = () => {
    setIsModalOpen(false);
    setSelectedComment({} as Comment);
    setModalCommentContent("");
    setModalReplyContent("");
  };

  // Handle comment status update in modal
  const handleUpdateStatus = () => {
    if (selectedComment) {
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === selectedComment.id
            ? { ...c, status: c.status === "approved" ? "pending" : "approved" } // Toggle between approved/pending
            : c
        )
      );
      console.log(`Comment ${selectedComment.id} status updated.`);
      closeCommentDetailModal();
    }
  };

  // Handle saving changes from modal
  const handleSaveChanges = () => {
    if (selectedComment) {
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === selectedComment.id
            ? { ...c, content: modalCommentContent, reply: modalReplyContent }
            : c
        )
      );
      console.log(`Changes saved for comment ${selectedComment.id}`);
      closeCommentDetailModal();
    }
  };

  // Handle deleting a single comment
  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      // Using window.confirm for simplicity, replace with custom modal
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== commentId)
      );
      console.log(`Comment ${commentId} deleted.`);
      if (selectedComment && selectedComment.id === commentId) {
        closeCommentDetailModal();
      }
    }
  };

  // Handle checkbox change for bulk actions
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCommentIds((prev) => [...prev, id]);
    } else {
      setSelectedCommentIds((prev) =>
        prev.filter((commentId) => commentId !== id)
      );
    }
  };

  // Handle select all checkbox
  const handleSelectAllChange = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedCommentIds(filteredComments.map((comment) => comment.id));
    } else {
      setSelectedCommentIds([]);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedCommentIds.length === 0) {
      console.log("No comments selected for bulk action.");
      return;
    }

    if (
      action === "delete" &&
      !window.confirm(
        `Are you sure you want to delete ${selectedCommentIds.length} selected comments?`
      )
    ) {
      return; // Using window.confirm for simplicity, replace with custom modal
    }

    setComments((prevComments: any) => {
      return prevComments
        .map((comment: any) => {
          if (selectedCommentIds.includes(comment.id)) {
            switch (action) {
              case "approve":
                return { ...comment, status: "approved" };
              case "unapprove":
                return { ...comment, status: "pending" };
              case "spam":
                return { ...comment, status: "spam" };
              case "delete":
                return null; // Mark for deletion
              default:
                return comment;
            }
          }
          return comment;
        })
        .filter(Boolean); // Remove nulls (deleted comments)
    });
    setSelectedCommentIds([]); // Clear selections after action
    console.log(`Bulk action "${action}" applied to selected comments.`);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white rounded-xl ">
        <h1 className="text-3xl font-bold text-gray-900 mb-6  pb-4">
          Comments Management
        </h1>

        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3 flex rounded-lg px-4 items-center border border-gray-300 gap-2">
            <Search color="#d1d5dc" />
            <input
              type="text"
              placeholder="Search comments..."
              className="w-full  pr-4 py-2   border-none outline-none  transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-2/3 space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              value={postFilter}
              onChange={(e) => setPostFilter(e.target.value)}
            >
              {blogPostsOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comments Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                    onChange={(e) => handleSelectAllChange(e.target.checked)}
                    checked={
                      selectedCommentIds.length === filteredComments.length &&
                      filteredComments.length > 0
                    }
                    disabled={filteredComments.length === 0}
                  />
                </th>
                {tableHeaders.map(({ label, className }) => (
                  <th
                    key={label}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      className || ""
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                  >
                    No comments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredComments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                        checked={selectedCommentIds.includes(comment.id)}
                        onChange={(e) =>
                          handleCheckboxChange(comment.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-900">
                      {comment.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comment.author} <br />{" "}
                      <span className="text-xs text-gray-500">
                        {comment.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:underline cursor-pointer">
                      {comment.post}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                          comment.status
                        )}`}
                      >
                        {comment.status.charAt(0).toUpperCase() +
                          comment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900 relative mr-3 group edit-comment-btn"
                        onClick={() => openCommentDetailModal(comment.id)}
                      >
                        <Pencil size={16} />
                        <span className="hidden group-hover:block text-xs absolute top-full">
                          Edit
                        </span>
                      </button>
                      <button
                        className="text-red-600 relative group cursor-pointer hover:text-red-900 delete-comment-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 size={16} />
                        <span className="hidden group-hover:block text-xs absolute top-full">
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination and Bulk Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <select
              id="bulk-action-select"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              onChange={(e) => handleBulkAction(e.target.value)}
              value="" // Reset select after action
            >
              {bulkActions.map(({ value, label }) => (
                <option key={value || "placeholder"} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* <BottomPagination /> */}
        </div>
      </div>

      {/* Comment Detail Modal */}
      {isModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Comment Details
              </h2>
              <button
                onClick={closeCommentDetailModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium text-gray-900">Author:</p>
                <p className="ml-2">{selectedComment.author}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Email:</p>
                <p className="ml-2">{selectedComment.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Post:</p>
                <p className="ml-2">{selectedComment.post}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Date:</p>
                <p className="ml-2">{selectedComment.date}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Status:</p>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(
                    selectedComment.status
                  )}`}
                >
                  {selectedComment.status.charAt(0).toUpperCase() +
                    selectedComment.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Comment:</p>
                <textarea
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 min-h-[120px] resize-y"
                  rows={5}
                  value={modalCommentContent}
                  onChange={(e) => setModalCommentContent(e.target.value)}
                ></textarea>
              </div>
              <div>
                <p className="font-medium text-gray-900">Reply:</p>
                <textarea
                  placeholder="Write a public reply..."
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 min-h-[80px] resize-y"
                  rows={3}
                  value={modalReplyContent}
                  onChange={(e) => setModalReplyContent(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={handleUpdateStatus}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                Toggle Status
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => handleDeleteComment(selectedComment.id)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
              >
                Delete Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
