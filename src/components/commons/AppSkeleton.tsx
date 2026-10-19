
import { Skeleton } from "antd";

export type SkeletonVariant =
  | "default"
  | "card"
  | "list"
  | "form"
  | "table"
  | "text"
  | "avatar"
  | "image"
  | "button"
  | "input";

type SkeletonTitle = boolean | { width?: string | number };

type SkeletonParagraph = boolean | {
  rows?: number;
  width?: string | number | Array<string | number>;
};

export interface AppSkeletonProps {
  variant?: SkeletonVariant;
  rows?: number;
  count?: number;
  active?: boolean;
  avatar?: boolean;
  title?: SkeletonTitle;
  paragraph?: SkeletonParagraph;
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

const AppSkeleton = ({
  variant = "default",
  rows = 3,
  count = 1,
  active = true,
  avatar = false,
  title,
  paragraph,
  className = "",
  width,
  height,
  rounded = false,
}: AppSkeletonProps) => {
  const wrapperClass = `w-full ${className}`.trim();

  const renderSkeleton = (index: number) => {
    switch (variant) {
      case "card":
        return (
          <div
            key={index}
            className={`w-full bg-white p-5 ${
              rounded ? "rounded-lg" : ""
            } ${className}`}
          >
            <Skeleton
              active={active}
              avatar={avatar}
              title={title ?? true}
              paragraph={paragraph ?? { rows }}
            />
          </div>
        );

      case "list":
        return (
          <div
            key={index}
            className={`flex w-full items-start gap-3 ${wrapperClass}`}
          >
            <Skeleton.Avatar active={active} size="large" />
            <div className="flex-1">
              <Skeleton
                active={active}
                title={title ?? true}
                paragraph={paragraph ?? { rows: 2 }}
              />
            </div>
          </div>
        );

      case "form":
        return (
          <div key={index} className={`space-y-4 ${wrapperClass}`}>
            {Array.from({ length: rows }, (_, fieldIndex) => (
              <div key={fieldIndex} className="space-y-2">
                <Skeleton
                  active={active}
                  title={{ width: "25%" }}
                  paragraph={false}
                />
                <Skeleton.Input
                  active={active}
                  block
                  style={{ width: "100%", height: 40 }}
                />
              </div>
            ))}
            <Skeleton.Button
              active={active}
              block
              size="large"
              style={{ height: 40 }}
            />
          </div>
        );

      case "table":
        return (
          <div key={index} className={`space-y-4 ${wrapperClass}`}>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <Skeleton
                key={rowIndex}
                active={active}
                title={false}
                paragraph={{ rows: 1 }}
              />
            ))}
          </div>
        );

      case "text":
        return (
          <div key={index} className={wrapperClass}>
            <Skeleton
              active={active}
              avatar={avatar}
              title={title ?? true}
              paragraph={paragraph ?? { rows }}
            />
          </div>
        );

      case "avatar":
        return (
          <div key={index} className={wrapperClass}>
            <Skeleton.Avatar
              active={active}
              size={width === "100%" ? "large" : "default"}
              shape={rounded ? "circle" : "square"}
              style={{ width, height }}
            />
          </div>
        );

      case "image":
        return (
          <div key={index} className={wrapperClass}>
            <Skeleton.Image
              active={active}
              style={{
                width: width ?? "100%",
                height: height ?? 180,
                borderRadius: rounded ? 8 : undefined,
              }}
            />
          </div>
        );

      case "button":
        return (
          <div key={index} className={wrapperClass}>
            <Skeleton.Button
              active={active}
              size="large"
              block={width === "100%"}
              style={{
                width: width ?? 120,
                height: height ?? 40,
              }}
            />
          </div>
        );

      case "input":
        return (
          <div key={index} className={wrapperClass}>
            <Skeleton.Input
              active={active}
              size="small"
              style={{
                width: width ?? 120,
                height,
                borderRadius: rounded ? 8 : undefined,
              }}
            />
          </div>
        );

      default:
        return (
          <div key={index} className={wrapperClass}>
            <Skeleton
              active={active}
              avatar={avatar}
              title={title ?? true}
              paragraph={paragraph ?? { rows }}
            />
          </div>
        );
    }
  };

  return (
    <>
      {Array.from(
        { length: Math.max(0, count) },
        (_, index) => renderSkeleton(index)
      )}
    </>
  );
};

export default AppSkeleton;