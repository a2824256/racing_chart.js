/**
 * Created by PPPPP_leung on 2017/2/3.
 */
function paint_obj(ctx) {
    this.ctx = ctx;

    this.paint_square = function (x, y, w, h, num) {
        console.log("x=" + x + ",y=" + y);
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
        var font_x = x + w / 2;
        var font_y = y + h / 2;
        if (num != 0) {
            this.paint_line(font_x, y, font_x, this.start_height);
        }
        if (num != 3) {
            this.paint_line(font_x, y + h, font_x, this.end_height);
        }
        this.set_font(font_x, font_y);
    }

    this.set_font = function (x, y) {
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#008600";
        this.ctx.fillText("Hello!", x, y);
    }

    this.paint = function (width, height, level, data_tree) {
        var square_width = width * 0.5 / level;
        var square_height = height * 0.4 / level;
        var layer_height = height / level;
        var end_height = height / level;
        var start_height = 0;
        this.start_height = start_height;
        this.end_height = end_height;
        for (var i = 0; i < level; i++) {
            var bottom_square_num = Math.pow(2, i);

            var start_width = 0;
            var layer_width = width / bottom_square_num;
            var end_width = width / bottom_square_num;
            if (i != (level - 1)) {
                this.paint_line(0, end_height, width, end_height);
            }
            for (var i_2 = 0; i_2 < bottom_square_num; i_2++) {
                this.get_position(start_width, end_width, start_height, end_height, square_width, square_height, i);
                start_width = end_width;
                end_width += layer_width;
            }
            start_height = end_height;
            end_height += layer_height;
            this.start_height = start_height;
            this.end_height = end_height;
        }
    }

    this.get_position = function (start_width, end_width, start_height, end_height, layer_width, layer_height, num) {
        var x = start_width + (end_width - start_width) / 2 - layer_width / 2;
        var y = start_height + (end_height - start_height) / 2 - layer_height / 2;
        this.paint_square(x, y, layer_width, layer_height, num);
    }

    this.paint_line = function (start_x, start_y, end_x, end_y) {
        // 绘制直线
        this.ctx.beginPath();
        // 起点
        this.ctx.moveTo(start_x, start_y);
        // 终点
        this.ctx.lineTo(end_x, end_y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}
