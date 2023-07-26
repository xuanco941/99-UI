from PIL import Image, ImageSequence

def get_last_frame_from_gif(file_path):
    try:
        with Image.open(file_path) as img:
            frames = [frame.copy() for frame in ImageSequence.Iterator(img)]
            last_frame = frames[-1]
            last_frame.save("last_frame.png")  # Lưu ảnh cuối cùng thành một tệp PNG mới
    except Exception as e:
        print("Error:", e)


# Sử dụng hàm để lấy ảnh cuối cùng từ tệp .gif
# get_last_frame_from_gif("masthead.gif")


def get_gif_duration(file_path):
    try:
        with Image.open(file_path) as img:
            duration_list = []
            # Lặp qua tất cả các khung hình trong tệp .gif và lấy thời gian chạy của mỗi khung
            for frame in ImageSequence.Iterator(img):
                duration = frame.info.get("duration", 100)  # Mặc định thời gian là 100ms nếu không tìm thấy thông tin
                duration_list.append(duration)

            total_duration = sum(duration_list) / 1000.0  # Tổng thời gian chạy tính bằng giây
            return total_duration
    except Exception as e:
        print("Error:", e)
        return None

# Sử dụng hàm để xem thời gian chạy của tệp .gif
# gif_file = "masthead.gif"
# duration = get_gif_duration(gif_file)
# if duration is not None:
#     print(f"Thời gian chạy của ảnh GIF là {duration:.2f} giây.")


def compress_gif(input_file, output_file, compress_level=3):
    try:
        with Image.open(input_file) as img:
            frames = [frame.copy() for frame in ImageSequence.Iterator(img)]
            duration = img.info.get("duration", 100)  # Thời gian chạy của GIF (mili-giây)
            
            # Lưu các khung hình vào tệp mới với mức nén (compress_level) chỉ định
            frames[0].save(output_file, save_all=True, append_images=frames[1:], optimize=True, duration=duration, loop=0, quality=compress_level)
        
        print(f"Đã nén và lưu tệp {output_file} thành công.")
    except Exception as e:
        print("Lỗi:", e)

# Sử dụng hàm để nén tệp ảnh GIF
input_gif_file = "masthead.gif"
output_gif_file = "masthead_output.gif"
compress_level = 6  # Mức nén (từ 0 đến 9), càng cao càng nén mạnh, mặc định là 3
compress_gif(input_gif_file, output_gif_file, compress_level)