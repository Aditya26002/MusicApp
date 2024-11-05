"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play, Music, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

type Video = {
  id: string;
  title: string;
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
};

const Dashboard = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoQueue, setVideoQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const REFRESH_INTERVAL_MS = 10 * 1000;

  async function refreshStreams() {
    const res = await axios.get("api/streams/my");
    console.log(res.data);
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {}, REFRESH_INTERVAL_MS);
  }, []);

  const addVideo = () => {
    const videoId = extractVideoId(videoLink);
    if (videoId) {
      const newVideo: Video = {
        id: videoId,
        title: `Video ${videoId}`,
        upvotes: 0,
        downvotes: 0,
        userVote: null,
      };
      setVideoQueue([...videoQueue, newVideo]);
      setVideoLink("");
    }
  };

  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const vote = (id: string, voteType: "up" | "down") => {
    setVideoQueue(
      videoQueue
        .map((video) => {
          if (video.id === id) {
            let newUpvotes = video.upvotes;
            let newDownvotes = video.downvotes;
            let newUserVote: "up" | "down" | null = voteType;

            // Remove previous vote
            if (video.userVote === "up") newUpvotes--;
            if (video.userVote === "down") newDownvotes--;

            // Add new vote
            if (voteType === "up" && video.userVote !== "up") newUpvotes++;
            if (voteType === "down" && video.userVote !== "down")
              newDownvotes++;

            // If clicking the same vote type, remove the vote
            if (video.userVote === voteType) newUserVote = null;

            return {
              ...video,
              upvotes: newUpvotes,
              downvotes: newDownvotes,
              userVote: newUserVote,
            };
          }
          return video;
        })
        .sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes))
    );

    fetch("api/streams/upvote", {
      body: JSON.stringify({
        streamId: id,
      }),
    });
  };

  const playNext = () => {
    if (videoQueue.length > 0) {
      setCurrentVideo(videoQueue[0].id);
      setVideoQueue(videoQueue.slice(1));
    }
    console.log(currentVideo);
  };

  useEffect(() => {
    if (!currentVideo && videoQueue.length > 0) {
      playNext();
    }
  }, [currentVideo, videoQueue]);

  const shareLink = () => {
    const shareableLink = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The shareable link has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Failed to copy",
          description: "An error occurred while copying the link.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">
            Song Voting System
          </h1>
          <Button
            onClick={shareLink}
            variant="outline"
            className="bg-white text-purple-600 border-purple-600 hover:bg-purple-100"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>

        {/* Video Input */}
        <Card className="mb-6 bg-white bg-opacity-80 backdrop-blur-sm">
          <CardContent className="flex space-x-2 p-4">
            <Input
              type="text"
              placeholder="Enter YouTube video link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="flex-grow"
            />
            <Button
              onClick={addVideo}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Add Video
            </Button>
          </CardContent>
        </Card>

        {/* Video Preview */}
        {videoLink && extractVideoId(videoLink) && (
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${extractVideoId(
                    videoLink
                  )}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Video */}
        {currentVideo && (
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Video Queue */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold text-purple-800">
            Upcoming Videos
          </h2>
          {videoQueue.map((video) => (
            <Card
              key={video.id}
              className="bg-white bg-opacity-80 backdrop-blur-sm"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                    alt={video.title}
                    className="w-24 h-18 object-cover rounded"
                  />
                  <span className="font-medium text-purple-800">
                    {video.title}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  {/* UPVOTE */}
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => vote(video.id, "up")}
                      className={`${
                        video.userVote === "up"
                          ? "bg-green-100 text-green-600 border-green-600"
                          : "text-green-600 border-green-600 hover:bg-green-100"
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {video.upvotes}
                    </span>
                  </div>
                  {/* DOWNVOTE */}
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => vote(video.id, "down")}
                      className={`${
                        video.userVote === "down"
                          ? "bg-red-100 text-red-600 border-red-600"
                          : "text-red-600 border-red-600 hover:bg-red-100"
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <span className="ml-2 text-sm font-medium text-red-600">
                      {video.downvotes}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Play Next Button */}
        <div className="text-center">
          <Button
            onClick={playNext}
            disabled={videoQueue.length === 0}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <Play className="mr-2 h-4 w-4" /> Play Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
